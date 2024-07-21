import { writable } from "svelte/store";

export default function settingsToggleStore() {
    const store = writable(false);
  
    function toggle() {
      store.update($show => !$show);
    }
  
    return {
      toggle,
      set: store.set,
      subscribe: store.subscribe
    };
  }