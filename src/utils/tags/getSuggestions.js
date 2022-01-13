import { globalTags } from "store/";
import { get } from "svelte/store";

export default function getSuggestions(query, usedTags) {
  let _query = query.toLowerCase();
  let suggestions = get(globalTags)
    .filter(({ name }) => name.toLowerCase().includes(_query))
    .filter((tag) => !usedTags.includes(tag.name));

  return suggestions.slice(0, 5);
}
