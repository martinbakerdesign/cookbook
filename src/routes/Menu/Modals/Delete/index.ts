import { get, writable } from "svelte/store";
import { hideModals, recipeId } from "../";
import { recipes } from "store/index";
import { hideModal } from "store/modals";

import DeleteModal from "./Modal--Delete.svelte";

const id = 'menu__delete';
const deleting = writable(false);
const error = writable(null);

function cancel() {
  hideModal(id)
  deleting.set(false);
}

async function deleteRecipe() {
  const $recipeId = get(recipeId);
  error.set(null);
  
  try {
    deleting.set(true);

    await recipes.delete($recipeId);

    hideModal(id);
  } catch (err) {
    error.set(err);
    throw err;
  } finally {
    deleting.set(false);
  }
}

export {
  DeleteModal as default,
  //
  id,
  deleting,
  error,
  //
  cancel,
  deleteRecipe
}