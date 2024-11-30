import { writable } from "svelte/store";

export default function cuedChangeStore() {
  const cuedChange = writable();
  const { set, subscribe } = cuedChange;

  function reset() {
    set(null);
  }

  return {
    set,
    subscribe,
    reset,
  };
}
