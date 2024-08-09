import { tags } from "store/index";
import { derived, get, writable } from "svelte/store";
import { useSetRef } from "utils/refs";
import getSuggestions from "utils/tags/getSuggestions";
export { default as default } from "./Recipe__Header__Meta__Tags.svelte";

const refs = {
  input: null,
};
export const setRef = useSetRef(refs);

export const value = writable("");
export const focus = writable(false);
export const selectedSuggestion = writable(null);
export const suggestions = derived([value, tags], ([$value, $tags]) =>
  $value.length > 0 ? getSuggestions($value, $tags) : []
);

export function onChange(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    e.preventDefault();
    return;
  }
}
export function onKeydown(e) {
  const $value = get(value);
  const $tags = get(tags);
  const $suggestions = get(suggestions);
  const $selectedSuggestion = get(selectedSuggestion);

  // Create new tag
  let isEnter = e.key === "Enter" || e.keyCode === 13;
  if (isEnter) {
    e.preventDefault();
    $selectedSuggestion != null
      ? tags.add($suggestions[$selectedSuggestion])
      : tags.add(value);
    value.set("");
    return;
  }
  // // Edit last tag
  // else if (e.key === "Backspace" && !value.length) {
  //   let lastTag = $tags[$tags.length - 1];
  //   value = lastTag.slice(0, lastTag.length);
  //   tags.remove(lastTag);
  // }
  // Remove last tag
  else if (e.key === "Backspace" && !$value.length) {
    let lastTag = $tags[$tags.length - 1];
    // value = lastTag.slice(0, lastTag.length);
    tags.remove(lastTag);
  } else if (
    e.key === "ArrowDown" ||
    e.key === "ArrowUp" ||
    e.keyCode === 40 ||
    e.keyCode === 38
  ) {
    const count = $suggestions.length;
    e.preventDefault();
    if (!$value.length || !count) return;
    let isDown = e.key === "ArrowDown" || e.keyCode === 40;
    let current = $selectedSuggestion;

    selectedSuggestion.set(
      isDown
        ? current == null
          ? 0
          : (current + 1) % count
        : current == null
          ? count - 1
          : (current + count - 1) % count
    );
  }
}
export function removeTag({ target }) {
  tags.remove(target.dataset.tag);
}
export function toggleFocus(e) {
  if (e.type === "focus") {
    selectedSuggestion.set(null);
    focus.set(true);
    return;
  } else if (
    e.type === "blur" &&
    !e.relatedTarget?.closest(".tags__suggestions")
  ) {
    focus.set(false);
  }
}
export function addTag({ target }) {
  tags.add(target.dataset.tag);
  focus.set(false);
  value.set("");
}
