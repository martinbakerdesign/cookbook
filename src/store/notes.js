import { writable } from "svelte/store";

export default function notesStore() {
  const store = writable("");
  const { set, update, subscribe } = store;

  function clear() {
    set("");
  }

  return {
    set,
    update,
    clear,
    subscribe,
  };
}
