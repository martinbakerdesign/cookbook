import { globalTags } from "store/";
import { get } from "svelte/store";
import removeEmojis from "utils/text/removeEmojis";

export default function getSuggestions(query, usedTags) {
  let _query = query.toLowerCase();
  let suggestions = get(globalTags)
    .filter((tag) => tag.toLowerCase().includes(_query))
    .filter((tag) => !usedTags.includes(tag))
    .sort((a, b) => (removeEmojis(a) < removeEmojis(b) ? -1 : 1))
    .sort((a, b) =>
      getMatchIndex(a, _query) < getMatchIndex(b, _query) ? -1 : 1
    );

  return suggestions.slice(0, 5);
}

function getMatchIndex(str = "", query = "") {
  let regexp = new RegExp(query, "i");
  let matchIndex = removeEmojis(str).search(regexp);
  return matchIndex;
}
