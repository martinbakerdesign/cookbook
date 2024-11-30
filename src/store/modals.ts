import { get, writable, type Writable } from "svelte/store";

const modals = new Map();

function registerModal(id: string, showStore: Writable<boolean> = writable(false)) {
  modals.set(id, showStore);
}

function modalsOpen () {
  return Array.from(modals.values()).map(store => get(store)).some(visible => visible);
}
function getOpenModals () {
  return Array.from(modals.entries()).find(([id, visible]) => get(visible))
}
function toggleModal (id, show = false) {
  if (!modals.has(id)) return;

  modals.get(id).set(show);

  document.documentElement.style.overflowY = modalsOpen() ? 'hidden' : 'auto';
}
function showModal (id) {
  toggleModal(id, true)
}
function hideModal (id) {
  toggleModal(id, false)
}
function hideAllModals () {
  Object
    .values(modals)
    .forEach(store => store.set(false));
}
function getModalStore (id) {
  return modals.get(id);
}
const modalRecipeId = writable(null);

export {
  modalRecipeId,
  //
  registerModal,
  modalsOpen,
  toggleModal,
  showModal,
  hideModal,
  getModalStore,
  hideAllModals
}