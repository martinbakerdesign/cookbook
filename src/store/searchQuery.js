import { get, writable } from "svelte/store";
import { globalTags } from "./index";
import {addTagToList, removeTagFromList} from "utils/tags";

export const tagSuggestions = writable([]);
export const suggestion = writable(0);

function searchQueryStore() {
  const store = writable({
    query: "",
    tags: [],
  });
  const { set: _set, update, subscribe } = store;

  function set($query) {
    update((s) => ({ ...s, query: $query }));


    tagSuggestions.set(getSuggestions($query));
    suggestion.set(0);
  }

  function clear() {
    _set({ query: "", tags: [] });
    tagSuggestions.set([]);
    suggestion.set(0);
  }

  function addTag(tag) {
    const {tags :$tags} = get(store);
    const tags = addTagToList($tags, tag);
    update((s) => ({ ...s, query: "", tags  }));

    tagSuggestions.set([]);
    suggestion.set(0);
  }

  /**
   *
   * @param {null|string} tag Passing a string will remove the tag that matches the string,
   * otherwise passing null will remove the last tag in the store's tag list
   */
  function removeTag(tag = null) {
    const $store = get(store);
    const { query: $query, tags: $tags } = $store;

    const tags = removeTagFromList($tags, tag);
    update((s) => ({ ...s, tags }));

    tagSuggestions.set(getSuggestions($query));
    suggestion.set(0)
  }

  function queryGlobalTags($query) {
    const hasQuery = $query && !!$query.length;
    return hasQuery ? globalTags.find($query) : [];
  }

  function getSuggestions($query) {
    const { tags: $tags } = get(store);

    const $suggestions = queryGlobalTags($query).filter(
      (tag) => !$tags.includes(tag)
    );

    return $suggestions;
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
