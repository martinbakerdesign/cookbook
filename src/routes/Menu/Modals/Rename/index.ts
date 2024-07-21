import { get, writable } from "svelte/store";
import { recipes } from "store/index";
import { hideModals, recipeId, selecting } from "../";

export { default as default } from "./Modal--Rename.svelte";

let originalValue: null | string = null;
export const value = writable("");
export const saving = writable(false);
export const error = writable();



export const refs = {
  input: null,
};

export async function renameRecipe() {
  const $value = get(value);
  const $recipeId = get(recipeId);

  error.set(null);
  if ($value === originalValue) {
    return hideModals(), value.set("");
  }
  if (!$value.length) return error.set("Recipe name cannot be empty");

  try {
    saving.set(true);

    await recipes.rename($recipeId, $value);

    hideModals();
    value.set("");
  } catch (err) {
    throw err;
  } finally {
    saving.set(false);
  }
}

export function cancel() {
  hideModals();
  refs.input && (refs.input.value = "");
  saving.set(false);
}

export function onPointerDown() {
  selecting.set(true);
}

export function onPointerUp() {
  selecting.set(false);
}

export function init () {
  selecting.subscribe(($selecting) => {
    const fns = ["removeEventListener", "addEventListener"];
    window[fns[+$selecting]]("pointerup", onPointerUp);
  });
  value.subscribe(($value) => {
    if (originalValue || !$value.length) return;
  
    originalValue = $value;
  });
  recipeId.subscribe(($recipeId) => {
    const name = $recipeId != null ? recipes.findById($recipeId)?.name ?? "" : "";
    originalValue = name;
    value.set(name);
  });
}

export function cleanup() {
  window.removeEventListener("pointerup", onPointerUp);
}
