import moduloop from "utils/math/moduloop";
import { derived, get, writable } from "svelte/store";
import { suggestion, tagSuggestions } from "store/searchQuery";
import { searchQuery } from "store";

export { default as default } from "./Menu__Header__Search.svelte";
export { default as Suggestions } from "./Menu__Header__Search__Suggestions.svelte";
export { default as Suggestion } from "./Menu__Header__Search__Suggestion.svelte";
export { default as Tag } from "./Menu__Header__Search__Tag.svelte";

const arrowKeys = ["ArrowUp", "ArrowDown"];
const arrowKeyCodes = [38, 40];

const refs = {
  input: null,
};
export function setRef(ref, key) {
  refs[key] = ref;
}

export const suggestions = suggestionsStore();

export const isFocused = writable(false);

export const hasValue = derived(
  [searchQuery],
  ([$searchQuery]) =>
    $searchQuery.query.length > 0 || $searchQuery.tags.length > 0
);

export const clearDisabled = derived(
  [searchQuery],
  ([$searchQuery]) => !$searchQuery.query.length && !$searchQuery.tags.length
);

export const state = derived(
  [hasValue, isFocused],
  ([$hasValue, $isFocused]) => (!$isFocused && !$hasValue ? "STATIC" : "ACTIVE")
);

export function suggestionsStore() {
  const suggestions = writable([]);
  const { set: _set, subscribe } = suggestions;

  function set(value) {
    _set(value.slice(0, 5).map((tag, index) => ({
        tag,
        matchLabel: getMatchMarkup(tag, get(searchQuery).query),
        selected: get(suggestion) === index,
        onClick: getClickHandler(tag),
        onPointerEnter: getPointerEnterHandler(index),
    })));
  }
  function clear() {
    _set([]);
  }

  return {
    set,
    clear,
    subscribe,
  };
}

export function toggleFocus({ type }) {
  isFocused.set(type === "focus" || get(searchQuery).query.length > 0);
}

export function clear() {
  searchQuery.clear();
  isFocused.set(false);
}

export function onInput() {
  !get(isFocused) && isFocused.set(true);
  searchQuery.set(refs.input.value);
}

export function clickOut({ target }) {
  if (target.closest("#header__search")) return;
  isFocused.set(false);
  window.removeEventListener("click", clickOut);
}

export function onShortcut({ key }) {
  if (focus || key !== "/") return;
  refs.input && refs.input.focus();
}

export function toggleSuggestion(e) {
  const $suggestions = get(suggestions);
  const $suggestion = get(suggestion);

  if (
    !arrowKeys.includes(e.key) &&
    !arrowKeyCodes.includes(e.keyCode) &&
    e.key !== "Backspace" &&
    e.keyCode !== 8 &&
    e.key !== "Enter" &&
    e.keyCode !== 13
  )
    return;

  let isEnter = e.key === "Enter" || e.keyCode === 13;
  let { query, tags } = get(searchQuery);

  // Enter
  if (
    (isEnter && $suggestions.length) ||
    arrowKeys.includes(e.key) ||
    arrowKeyCodes.includes(e.keyCode) ||
    (!query.length && tags.length)
  ) {
    e.preventDefault();
  }
  if (isEnter && $suggestions.length) {
    let tag = $suggestions[$suggestion].tag;
    searchQuery.addTag(tag), isFocused.set(false);
    return;
  }
  // Arrow Up / Arrow Down
  else if (arrowKeys.includes(e.key) || arrowKeyCodes.includes(e.keyCode)) {
    let isDown = e.key === "ArrowDown" || e.keyCode === 40;

    let index = moduloop(
      $suggestion + (isDown ? 1 : -1),
      0,
      $suggestions.length - 1
    );
    suggestion.set(index);

    return;
  }
  // Backspace
  else if (!query.length && tags.length) {
    console.log("removing tag");
    isFocused.set(true);
    return searchQuery.removeTag();
  }
}

tagSuggestions.subscribe(($tagSuggestions) => {
  suggestions.set($tagSuggestions);
});
suggestion.subscribe(() => {
  suggestions.set(get(tagSuggestions));
});
isFocused.subscribe(($focused) => {
  const fns = ["removeEventListener", "addEventListener"];
  window[fns[+$focused]]("click", clickOut);
});

export function init() {
  window.addEventListener("keyup", onShortcut);
}

export function cleanup() {
  window.removeEventListener("keyup", onShortcut);
  window.removeEventListener("click", clickOut);
}

export function getRemoveTagCallback(tag) {
  return () => {
    searchQuery.removeTag(tag);
  };
}

export function getClickHandler(tag) {
  return () => {
    searchQuery.addTag(tag);
  };
}
export function getPointerEnterHandler(index) {
  return () => {
    suggestion.set(index);
  };
}
export function getMatchMarkup (tag, $query) {
    return tag.replace(
        new RegExp($query, "gi"),
        (match) => `<b>${match}</b>`
    );
}