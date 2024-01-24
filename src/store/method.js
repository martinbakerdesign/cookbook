import { writable } from "svelte/store";

const initialState = [];

function methodStore(arg = initialState) {
  let { subscribe, update, set: _set } = writable(arg);

  function set(newValue) {
    _set(
      newValue.map((i) => ({
        ...i,
        type: i.type.replace("METHOD__", ""),
      }))
    );
  }

  return {
    subscribe,
    set,
  };
}

export default methodStore;
