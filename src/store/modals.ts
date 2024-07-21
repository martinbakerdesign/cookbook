import { writable } from "svelte/store";

export const modalStates = new WeakMap();

export function registerModal(key: HTMLElement, visible: boolean = false) {
  modalStates.set(key, writable(visible));
}

export function anyModalsOpen () {
  return Object.values(modalStates).some(visible => visible);
}