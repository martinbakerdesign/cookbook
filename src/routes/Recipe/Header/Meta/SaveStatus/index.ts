import { cuedChange, lastSaved, pushing } from "store/index";
import { derived, get, writable } from "svelte/store";
import writableDerived from "utils/store/writableDerived";

export { default as default } from "./Recipe__Header__Meta__SaveStatus.svelte";

export { default as stateIcons } from "./stateIcons";

const refs = {
  timeout: null,
};

export const state = derived(
  [pushing, cuedChange],
  ([$pushing, $cuedChange]) => {
    return $pushing || $cuedChange != null ? 1 : 0;
  },
  0
);

export const statusLabel = writableDerived(
  [pushing, cuedChange, lastSaved],
  ([$pushing, $cuedChange, $lastSaved]) => {
    return $pushing
        ? "Saving..."
        : $cuedChange != null
          ? "Changes cued"
          : $lastSaved
            ? "Saved"
            : null
  }
);


export function init () {
  statusLabel.subscribe(($label) => {
    if (!$label) return;
  
    refs.timeout = setTimeout(() => {
      statusLabel.set(null);
    }, 2000);
  });
  state.subscribe(() => {
    clearTimeout(refs.timeout);
  });

  return cleanup
}

function cleanup () {}