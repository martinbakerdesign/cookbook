import { writable } from "svelte/store";

export default function descriptionStore() {
  const description = writable("");
  const { set: _set, subscribe } = description;
  const shadow = document.createElement("div");

  function set(html) {
    shadow.innerHTML = html;

    _set(shadow.textContent);
    clear();
  }
  function clear() {
    shadow.innerHTML = "";
  }

  return {
    set,
    subscribe,
  };
}
