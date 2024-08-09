import { writable } from "svelte/store";
import { settings } from "store/";

export { default as default } from "./Settings__Input.svelte";

export { default as Radio } from "./Settings__Input--Radio.svelte";
export { default as Select } from "./Settings__Input--Select.svelte";
export { default as Switch } from "./Settings__Input--Switch.svelte";
export { default as Text } from "./Settings__Input--Text.svelte";

export function inputStore(key: string = "", initial: string = "") {
  const store = writable(initial);
  const { set: _set, subscribe, update } = store;

  function set(value) {
    settings.set(key, value);
    _set(value);
  }
  return {
    set,
    subscribe,
  };
}
