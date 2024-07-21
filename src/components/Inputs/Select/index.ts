import { get, writable } from "svelte/store";
import clamp from "utils/math/clamp";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";
import { uniqueId } from "lodash";
import { useSetRef } from "utils/refs";

export { default as default } from "./Select.svelte";
export { default as Toggle } from "./Select__Toggle.svelte";
export { default as Option } from "./Select__Option.svelte";

let searchAheadItems, searchAheadIndexes;

const arrowKeyCodes = [38, 40];
const jumpKeyCodes = [36, 35];
const escKeyCode = [27];
const searchAheadKeyCodes = new Array(90 - 48).fill(0).map((v, i) => i + 48);

export function getOptionLabel(value) {
  return value?.label ?? value?.value ?? value?.id ?? value ?? "";
}
function getOptionValue(value) {
  return (value?.value ?? value?.id ?? value.label ?? value ?? "").toString();
}
export function getIsSelected(value, option, index) {
  return value != null ? getOptionValue(option) === value : !index;
}

function doRefsContain(refs, keys: string[], target) {
  return keys.some((key) => refs[key] && refs[key].contains(target));
}
function getFocusIndex(value, optionValues) {
  return value != null
    ? optionValues.findIndex(
        (optionValue) => optionValue.toString() === value.toString()
      )
    : 0;
}
function getOptionsGap(el) {
  if (!el) return 0;

  const rowGap = getComputedStyle(el).rowGap;
  const rowGapPx = "normal" === rowGap ? 0 : cssValueToPixels(rowGap);

  const lis = $$(el, "li");
  const marginPx = getMarginGap(lis);

  return rowGapPx + marginPx;
}
function getMarginGap(liEls) {
  const firstEl = liEls[0];
  const secondEl = liEls[1] ?? liEls[0];

  const marginBottom = cssValueToPixels(getComputedStyle(firstEl).marginBottom);
  const marginTop = cssValueToPixels(getComputedStyle(secondEl).marginTop);

  return marginBottom + marginTop;
}
function cssValueToPixels(value: string) {
  const numberValue = +extractDigits(value);
  if (value.includes("rem")) {
    return numberValue * 16;
  } else if (value.includes("vh")) {
    return (numberValue / 100) * window.innerHeight;
  } else if (value.includes("vw")) {
    return (numberValue / 100) * window.innerWidth;
  }

  return numberValue;
}
function extractDigits(str: string) {
  return str.match(/\d+/g)?.[0] ?? "";
}

export function selectStore($id = null, dispatch) {
  let options = [];
  const id = writable($id ?? uniqueId("select--"));
  const value = writable(null);
  const expanded = writable(false);
  const focus = writable(0);
  const width = writable(0);
  const optionLabels = writable([]);
  const optionValues = writable([]);
  const resizeObserver = new ResizeObserver(onResize);

  let optionHeight = 0,
    optionsGap = 0;

  const refs = {
    toggle: null,
    toggleLabel: null,
    popup: null,
    options: [],
  };
  const setRef = useSetRef(refs);

  const state = {
    id,
    value,
    expanded,
    focus,
    width,
    optionLabels,
    optionValues,
  };

  function init() {
    resizeObserver.observe(refs.popup);
    refs.options = $$(refs.popup, "button");
  }
  function onResize() {
    const listItem = $(refs?.popup, "li");
    if (!listItem) return;

    width.set(listItem.getBoundingClientRect().width);

    optionHeight = $(refs.popup, "li").getBoundingClientRect().height;
    optionsGap = getOptionsGap(refs.popup);
  }
  function cleanup() {
    removeListeners();
    resizeObserver.disconnect();
  }
  function removeListeners() {
    window.removeEventListener("click", onClickOut);
    window.removeEventListener("keydown", onKeyDown);
  }
  function onOptionsChange($options) {
    options = $options;
    optionValues.set($options.map(getOptionValue));
    optionLabels.set($options.map(getOptionLabel));
  }
  function setId($id) {
    id.set($id);
  }
  function onClickOut(e) {
    if (doRefsContain(refs, ["button", "popup"], e.target)) return;
    hide(e);
  }
  function onKeyDown(e) {
    if (
      ![
        ...searchAheadKeyCodes,
        ...jumpKeyCodes,
        ...arrowKeyCodes,
        ...escKeyCode,
      ].includes(e.keyCode)
    )
      return;

    searchAheadKeyCodes.includes(e.keyCode) && searchAhead(e);
    escKeyCode.includes(e.keyCode) && hide(e);
    arrowKeyCodes.includes(e.keyCode) && toggleFocus(e);
    jumpKeyCodes.includes(e.keyCode) && jumpFocus(e);
  }
  function toggleFocus(e) {
    const $focus = get(focus);
    const isDown = e.keyCode === 40;
    const delta = isDown ? 1 : -1;
    const newFocus =
      $focus != null
        ? clamp(0, $focus + delta, options.length - 1)
        : isDown
          ? 0
          : options.length - 1;
    if (newFocus === $focus) return;

    focus.set(newFocus);
    refs.options[newFocus].focus();
  }
  function jumpFocus(e) {
    const isDown = e.keyCode === 36;
    const newFocus = isDown ? 0 : options.length - 1;
    if (newFocus === get(focus)) return;
    refs.options[newFocus].focus();
  }
  function hide(e) {
    expanded.set(false);
    focus.set(getFocusIndex(get(value), get(optionValues)));
    removeListeners();

    if (!escKeyCode.includes(e?.keyCode ?? null)) return;

    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }
  function expand() {
    const $value = get(value);

    const $focus = getFocusIndex($value, get(optionValues));
    focus.set($focus);

    setPopupTransform($focus);

    expanded.set(true);
    refs.options[$focus] && refs.options[$focus].focus();
    requestAnimationFrame(() => {
      window.addEventListener("click", onClickOut);
      window.addEventListener("keydown", onKeyDown);
    });
  }
  function getCurrentOption($value, defaultLabel = "") {
    if (!options || !options.length) return defaultLabel ?? "";
    const $optionValues = get(optionValues);
    const index = getFocusIndex($value, $optionValues);

    return options[index] ?? defaultLabel;
  }
  function searchAhead(e) {
    if (!getAreRefsSet()) return;

    const firstLetters = get(optionLabels).map((label) =>
      label.slice(0, 1).toLowerCase()
    );
    const items = options.filter(
      (option, index) => firstLetters[index] === e.key.toLowerCase()
    );

    if (searchAheadItems !== items) {
      searchAheadItems = items;
      searchAheadIndexes = items.map((i) =>
        get(optionValues).findIndex(
          (optionValue) => optionValue === getOptionValue(i)
        )
      );
      refs.options[searchAheadIndexes[0]]?.focus();
      return;
    }

    if (searchAheadItems.length === 1) return;

    const searchIndex = searchAheadIndexes.findIndex(
      (o) => getOptionValue(o) === getOptionValue(options[get(focus)])
    );
    const newIndex = (searchIndex + 1) % searchAheadIndexes.length;
    refs.options[searchAheadIndexes[newIndex]]?.focus();
  }
  function blurOnLeave(e) {
    focus.set(null);
  }
  function focusOnEnter(e) {
    const $focus = get(focus);
    const itemIndex = +e.target.dataset.index;

    if ($focus === itemIndex) return;

    focus.set(itemIndex);
  }
  function setValue(e) {
    const $value = e.target.closest("button").dataset.value;
    const index = +e.target.closest("button").dataset.index;
    value.set($value);

    dispatch("change", $value);

    focus.set(index);
    hide(e);
  }
  function getAreRefsSet() {
    return !Object.values(refs).some((ref) =>
      Array.isArray(ref) ? !ref.length : null == ref
    );
  }
  function setPopupTransform($focus) {
    if (!getAreRefsSet()) return;

    const translateY = -(
      $focus * optionHeight +
      Math.max(0, $focus - 1) * optionsGap
    );
    refs.popup.style.transform = `translateY(${translateY}px)`;
  }

  return {
    ...state,
    init,
    cleanup,
    setRef,
    onOptionsChange,
    setId,
    expand,
    getCurrentOption,
    blurOnLeave,
    focusOnEnter,
    setValue,
  };
}
