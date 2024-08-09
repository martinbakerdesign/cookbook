import { amount, scaleFactor } from "store/index";
import { derived, get, writable } from "svelte/store";
import scaleAmount from "utils/text/scaleAmount";
import { scale } from "..";

export { default as default } from "./Recipe__Header__Toolbar__Scale.svelte";

export const focus = writable(false);
export const showOptions = writable(false);

export const suggestions = derived(
  [scaleFactor, amount],
  ([$scaleFactor, $amount]) => getSuggestions($scaleFactor, $amount)
);

scaleFactor.subscribe(($scaleFactor) => {scale(+$scaleFactor)})

export function toggleFocus({ type, relatedTarget }) {
  focus.set(
    type === "focus" ||
      (relatedTarget &&
        relatedTarget.closest("#recipe__header__toolbar__scale__suggestions"))
  );
}
export function getSuggestions(scaleFactor, amount) {
  let value, scaled, active;

  return new Array(8).fill(0).map((v, i) => {
    value = i < 3 ? 1 / Math.pow(2, 3 - i) : i - 2;
    scaled = scaleAmount(amount, value);
    active = value === parseFloat(scaleFactor);

    return {
      value,
      scaled,
      active,
    };
  });
}
export function onSuggestionClick({ target }) {
  const value = +target.closest("button").dataset.value;
  scaleFactor.set(value.toFixed(value >= 1 ? 1 : 2));
  focus.set(false);
}
export function onMinus() {
  onIncrement(-1);
}
export function onPlus() {
  onIncrement(1);
}
export function onIncrement(incrementBy) {
  scaleFactor.update(($scaleFactor) => {
    const scaleFactorValue = parseFloat($scaleFactor);
    const value = Math.max(0, scaleFactorValue + incrementBy);
    return value.toFixed(value >= 1 ? 1 : 2);
  });
}
export function onOptionsToggle() {
  showOptions.update($showOptions => !$showOptions);
}