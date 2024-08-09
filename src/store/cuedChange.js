import { get, writable } from "svelte/store";
import { scaleFactor } from "store/index";
import scaleRecipe from "utils/recipes/scale";

export default function cuedChangeStore() {
  const cuedChange = writable();
  const { set: _set, subscribe } = cuedChange;

  function set(update) {
    _set({ ...update, ...scaleRecipe(update, 1 / get(scaleFactor)) });
  }
  function reset() {
    _set(null);
  }

  return {
    set,
    subscribe,
    reset,
  };
}
