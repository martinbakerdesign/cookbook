import { derived, get, writable } from "svelte/store";

export { default as default } from "./Menu__Modals.svelte";

export { default as Rename } from "./Rename";
export { default as Share } from "./Share";
export { default as Delete } from "./Delete";

export const recipeId = writable(null);
export const selecting = writable(false);

export const showShareModal = writable<boolean>(false);
export const showRenameModal = writable<boolean>(false);
export const showDeleteModal = writable<boolean>(false);

const modalShowing = derived(
  [showShareModal, showRenameModal, showDeleteModal],
  ($show) => $show.some((show) => show)
);
modalShowing.subscribe((areModalsShowing) => {
  const fns = ["removeEventListener", "addEventListener"];
  const addRemoveFn = fns[+areModalsShowing];

  window[addRemoveFn]("pointerup", onClickOut),
    window[addRemoveFn]("keyup", onEscape);
});

export function hideModals() {
  showRenameModal.set(false),
    showShareModal.set(false),
    showDeleteModal.set(false),
    recipeId.set(null);
}

export function onClickOut(e) {
  const $selecting = get(selecting);

  if (
    e.target.closest(".modal") ||
    e.target.closest(".contextmenu__list__item") ||
    e.target.closest(".menu__recipes__list__item__delete") ||
    $selecting
  )
    return;

  hideModals();
}

export function onEscape(e) {
  if (e.key !== "Escape" && e.keyCode !== 27) return;
  hideModals();
}

export function modalsCleanUp() {
  window.removeEventListener("pointerup", onClickOut);
  window.removeEventListener("keyup", onEscape);
}