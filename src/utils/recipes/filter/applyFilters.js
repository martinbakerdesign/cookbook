import { recipes, searchQuery } from "store/";
import { get } from "svelte/store";

export default function applyFilters() {
  let { query, tags } = get(searchQuery);
  if (!query && !tags.length) return get(recipes);

  let filters = {
    ...(query && { name: query }),
    ...(tags && { tags }),
  };

  let stack = [];

  for (let param in filters) {
    query = filters[param];
    switch (param) {
      default:
      case "name":
        stack.push(recipes.filterByName(filters[param]));
        continue;
      case "tag":
        stack.push(recipes.filterByTagId(filters[param]));
        continue;
      case "tags":
        stack.push(recipes.filterByTags(filters[param]));
        continue;
    }
  }

  let set = new Set(stack.flat(2));

  return [...set];
}
