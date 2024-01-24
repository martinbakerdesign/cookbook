import { subscribe } from "svelte/internal";
import { writable } from "svelte/store";

const loggedIn = (function () {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    set,
  };
})();

export default loggedIn;
