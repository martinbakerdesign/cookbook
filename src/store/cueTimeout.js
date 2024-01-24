import { get, writable } from "svelte/store";

export default function cueTimeoutStore() {
  const cueTimeout = writable();
  const { set: _set, subscribe } = cueTimeout;

  function set(fn, dur) {
    clear();
    _set(setTimeout(fn, dur));
  }
  function clear() {
    clearTimeout(get(cueTimeout));
    _set(null);
  }

  return {
    set,
    subscribe,
    clear,
  };
}
