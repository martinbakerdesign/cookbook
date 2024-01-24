import { writable } from "svelte/store";

const initialState = [];

function ingredientStore(arg = initialState) {
  let { subscribe, update, set: _set } = writable(arg);

  function set(newValue) {
    _set(
      newValue.map((i) => ({
        ...i,
        type: i.type.replace("INGREDIENTS__", ""),
      }))
    );
  }

  return {
    subscribe,
    set,
  };
}

export default ingredientStore;
