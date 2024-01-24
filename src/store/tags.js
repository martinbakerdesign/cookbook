import { get, writable } from "svelte/store";
import { globalTags } from "./index";

function tagsStore(initial = []) {
  const tags = writable(initial);
  const { set, update, subscribe } = tags;

  async function add(name) {
    try {
      if (get(tags).includes(name)) return;
      if (!globalTags.exists(name)) await globalTags.add(name);
    } catch (err) {
      throw err;
    } finally {
      update((t) => [...t, name]);
    }
  }
  function remove(name) {
    update((t) => t.filter((tag) => tag !== name));
  }

  return {
    set,
    update,
    subscribe,
    add,
    remove,
  };
}

export default tagsStore;
