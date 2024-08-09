import { derived, get, writable } from "svelte/store";

export { default as default } from "./Menu__Modals.svelte";

export { default as Rename } from "./Rename";
export { default as Share } from "./Share";
export { default as Delete } from "./Delete";
export { default as Import } from "./Import";

import {hideAllModals} from 'store/modals'

export const recipeId = writable(null);
export const selecting = writable(false);

export function hideModals() {
  hideAllModals();
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