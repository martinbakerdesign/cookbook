import { amount, scaleFactor } from "store/index";
import { derived, get } from "svelte/store";
import { useSetRef } from "utils/refs";
import scaleAmount from "utils/text/scaleAmount";
import unscaleAmount from "utils/text/unscaleAmount";

export { default as default } from "./Recipe__Header__Meta__Servings.svelte";

export const value = derived(
  [amount, scaleFactor],
  ([$amount, $scaleFactor]) => scaleAmount($amount, $scaleFactor)
);

const refs = {
  input: null,
};
export const setRef = useSetRef(refs);

export function onInput() {
  if (!refs.input) return;

  const unscaled = unscaleAmount(refs.input.value, get(scaleFactor));
  if (unscaled === get(amount)) return;

  amount.set(unscaled);
}

export function cleanup() {
  
}
