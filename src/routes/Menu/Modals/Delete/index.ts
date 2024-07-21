import { get, writable } from "svelte/store";
import { hideModals, recipeId, showDeleteModal } from "../";
import { recipes } from "store/index";

export { default as default } from "./Modal--Delete.svelte";

export const deleting = writable(false);
export const error = writable(null);

export function cancel() {
  hideModals();
  deleting.set(false);
}

export async function deleteRecipe() {
  const $recipeId = get(recipeId);
  error.set(null);
  
  try {
    deleting.set(true);

    await recipes.delete($recipeId);

    showDeleteModal.set(false);
  } catch (err) {
    error.set(err);
    throw err;
  } finally {
    deleting.set(false);
  }
}