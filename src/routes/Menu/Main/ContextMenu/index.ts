import { itemTypes } from 'components/ContextMenu';
import { showShareModal, recipeId, showRenameModal, showDeleteModal } from "routes/Menu/Modals";

export { default as default } from "./ContextMenu.svelte";

let hideContextCallback = () => {};
export function setHideContextCallback(callback) {
  hideContextCallback = callback;
}

export const items = [
  {
    label: "Share",
    icon: "share",
    onClick: openShareModal,
    type: itemTypes.ITEM,
  },
  {
    label: "Rename",
    icon: "rename",
    onClick: openRenameModal,
    type: itemTypes.ITEM,
  },
  {
    label: "Duplicate",
    icon: "copy",
    onClick: duplicateRecipe,
    type: itemTypes.ITEM,
  },
  {
    type: itemTypes.DIVIDER,
  },
  {
    label: "Delete",
    icon: "delete",
    onClick: openDeleteModal,
    type: itemTypes.ITEM,
  },
];

function openShareModal() {
  showShareModal.set(true);
  recipeId.set(recipeId);
  hideContextCallback &&
    "function" === typeof hideContextCallback &&
    hideContextCallback();
}
function openRenameModal() {
  showRenameModal.set(true);
  recipeId.set(recipeId);
  hideContextCallback &&
    "function" === typeof hideContextCallback &&
    hideContextCallback();
}
function openDeleteModal() {
  showDeleteModal.set(true);
  recipeId.set(recipeId);
  hideContextCallback &&
    "function" === typeof hideContextCallback &&
    hideContextCallback();
}
async function duplicateRecipe() {
  try {
    // TODO
  } catch (err) {
  } finally {
    hideContextCallback &&
      "function" === typeof hideContextCallback &&
      hideContextCallback();
  }
}
