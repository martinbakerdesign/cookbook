import { writable } from "svelte/store";

const initialState = [];

function miseEnPlaceStore(arg = initialState) {
  let { subscribe, update, set: _set } = writable(arg);

  function set(newValue) {    
    _set(
      newValue.map((i) => ({
        ...i,
        type: i.type.replace("MISE_EN_PLACE__", ""),
      }))
    );
  }

  return {
    subscribe,
    set,
  };
}

export default miseEnPlaceStore;
