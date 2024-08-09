import { get, writable } from "svelte/store";

export { default as default } from "./Switch.svelte";

export const value = switchStore();

let onToggle = (...args: any[]) => {};
export function setToggleHandler(handler) {
  onToggle = handler;
}

function switchStore(initial = false) {
  const store = writable(initial);
  const { set, subscribe } = store;

  function toggle() {
    const $value = !get(store);
    onToggle && onToggle($value);
    set($value);
  }
  return {
    toggle,
    set,
    subscribe,
  };
}
export function onClick() {
  value.toggle();
}
