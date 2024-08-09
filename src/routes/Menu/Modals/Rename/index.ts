import { get, writable } from "svelte/store";
import { recipes } from "store/index";
import { hideModals, recipeId, selecting } from "../";
import { hideModal } from "store/modals";

export { default as default } from "./Modal--Rename.svelte";

let originalValue: null | string = null;

export const value = writable("");
export const saving = writable(false);
export const error = writable();

const id = 'menu__rename';

const refs = {
  input: null,
};

async function renameRecipe() {
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

function cancel() {
  hideModal(id);
  refs.input && (refs.input.value = "");
  saving.set(false);
}

function onPointerDown() {
  selecting.set(true);
}

function onPointerUp() {
  selecting.set(false);
}

function init () {
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

  return cleanup
}

function cleanup() {
  window.removeEventListener("pointerup", onPointerUp);
}

export {
  id,
  refs,
  //
  renameRecipe,
  onPointerUp,
  onPointerDown,
  cancel,
  init,

}
