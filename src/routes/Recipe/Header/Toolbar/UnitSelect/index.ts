import { derived, get, writable } from "svelte/store";
import { unitsByTitle, unitsByType } from "data/units";
import { settings, currentUnit } from "store/index";
import sortByPreferred from "utils/units/sortByPreferred";

export { default as default } from "./Recipe__Header__Toolbar__UnitSelect.svelte";

export const showOptions = writable(false);
showOptions.subscribe(($showOptions) => {
  const fns = ["removeEventListener", "addEventListener"];
  window[fns[+$showOptions]]("keydown", onKeyDown);
});

export const focused = writable(null);
export const options = derived(
  [currentUnit, settings],
  ([$currentUnit, $settings]) => getOptions($currentUnit, $settings.units)
);
export const current = derived(
  [currentUnit, options],
  ([$currentUnit, $options]) =>
    $options.filter((o) => o.title === $currentUnit)[0]
);
export const disabled = derived(
  [currentUnit],
  ([$currentUnit]) => {
    return $currentUnit == null;
  },
  true
);

export function getOptions(currentUnit, preferred) {
  let unit = unitsByTitle[currentUnit];
  if (!currentUnit || !unit || get(disabled))
    return sortByPreferred([], preferred);
  let typeUnits = sortByPreferred(unitsByType[unit.type], preferred);

  return typeUnits;
}
export function toggleShow() {
  showOptions.update(($showOptions) => !$showOptions);

  !get(showOptions) && toggleFocused(null);
}
export function toggleType({ target }) {
  currentUnit.set(target.closest("li").dataset.value);
  onEsc();
}
export function onClickOut({ target }) {
  const $showOptions = get(showOptions);
  if (!$showOptions || target.closest("#recipe__header__toolbar__block-type"))
    return;
  $showOptions && onEsc();
}
export function onKeyDown(e) {
  switch (e.key) {
    case "Escape":
      return onEsc();
    case "Enter":
    case "Space":
      return onOptionClick(e);
    case "ArrowUp":
    case "ArrowDown":
      return onArrowPressed(e.key === "ArrowUp" ? "up" : "down");
    default:
      break;
  }
}
export function onEsc() {
  const $options = get(options);
  const $currentUnit = get(currentUnit);

  showOptions.set(false);
  toggleFocused($options.findIndex((o) => o.title === $currentUnit));
}
export function onOptionClick(e) {
  const $options = get(options);
  const $focused = get(focused);
  e.preventDefault();
  currentUnit.set($options[$focused].title);
  onEsc();
}
export function onArrowPressed(updown) {
  const $options = get(options);
  const $focused = get(focused);
  const newIndex =
    $focused == null
      ? 0
      : updown === "up"
        ? Math.max($focused - 1, 0)
        : Math.min($focused + 1, $options.length - 1);
  toggleFocused(newIndex);
}
export function onMouseEnter({ target }) {
  toggleFocused(+target.dataset.index);
}
export function toggleFocused(index) {
  focused.set(index);
}

export function init() {
  window.addEventListener("click", onClickOut);

  return cleanup;
}
function cleanup() {
  window.removeEventListener("click", onClickOut);
}