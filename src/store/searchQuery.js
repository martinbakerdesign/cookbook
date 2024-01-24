import { get, writable } from "svelte/store";
import { globalTags } from "./index";

export const tagSuggestions = writable([]);
export const suggestion = writable(0);

function searchQueryStore() {
  const searchQuery = writable({
    query: "",
    tags: [],
  });
  const { set: _set, update, subscribe } = searchQuery;

  function set(query) {
    let { tags } = get(searchQuery);
    update((s) => ({ ...s, query }));
    tagSuggestions.set(
      !query.length
        ? []
        : globalTags
            .find(query)
            .filter((t) => !tags.map(({ id }) => id).includes(t.id))
    );
    suggestion.set(0);
  }
  function clear() {
    _set({ query: "", tags: [] });
    tagSuggestions.set([]);
    suggestion.set(0);
  }

  function addTag(tag) {
    update((s) => ({ ...s, query: "", tags: [...s.tags, tag] }));
    tagSuggestions.set([]);
    suggestion.set(0);
  }
  function removeTag(tag = null) {
    let last = get(searchQuery).tags.length - 1;
    update((s) => ({
      ...s,
      tags: s.tags.filter((t, i) => (t != null ? t !== tag : i !== last)),
    }));
    let query = get(searchQuery).query;
    tagSuggestions.set(
      !query.length
        ? []
        : globalTags
            .find(query)
            .filter(
              (t) =>
                !get(searchQuery).tags.filter((tt) => tt !== tag).length
            )
    );
  }

  return {
    set,
    subscribe,
    addTag,
    removeTag,
    clear,
  };
}

export default searchQueryStore;
