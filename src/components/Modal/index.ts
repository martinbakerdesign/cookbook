import { get, writable } from "svelte/store";
import $ from 'utils/dom/querySelector'

export { default as default } from "./Modal.svelte";

export const refs = {
  modal: null,
  bg: null,
};

export const show = writable(false);

let autofocus = false;
export function toggleAutofocus($autofocus) {
  autofocus = $autofocus;
}

export function toggleListeners(show) {
  const fns = ["removeEventListener", "addEventListener"];
  window[fns[+show]]("keydown", onKeyDown);
  window[fns[+show]]("click", onClickOut);
}

export function toggleModal(s = false) {
  const $show = get(show);
  show.set(s ?? !$show);
}

type Focusable = HTMLInputElement | HTMLTextAreaElement;

export function setAttributes(el: HTMLElement) {
  if (!el.children || !el.children.length) return;

  const firstChild = el.children[0];
  firstChild.setAttribute("role", "dialog");
  firstChild.setAttribute("tabindex", "-1");

  const input = $(el, 'input, textarea') as Focusable;
  if (!input) return;

  if (!autofocus) return;
  input.focus();
}

export function onKeyDown(e) {
  const $show = get(show);

  if (!$show || e.key !== "Escape" || e.target.closest("button.input__option"))
    return;

  e.preventDefault();
  window.event.preventDefault();
  toggleModal(false);
}

export function onClickOut(e) {
  if (refs.bg !== e.target) return;

  toggleModal(false);
}

export function cleanup() {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("click", onClickOut);
}
