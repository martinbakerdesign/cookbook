import { recipes, searchQuery } from "store/";
import { authorSelection } from "store/menu";
import { get } from "svelte/store";

const debug = true;

export default function applyFilters() {
  const { query, tags } = get(searchQuery);
  const authorFilter = get(authorSelection);
  debug && console.log({query, tags, authorFilter})
  if (!query && !tags.length && authorFilter === 0) return get(recipes);

  const filters = {
    ...(query && { name: query }),
    ...(tags && { tags }),
  };

  const stack = !query && !tags.length
    ? get(recipes)
    : [];

  for (let param in filters) {
    // query = filters[param];
    switch (param) {
      default:
      case "name":
        stack.push(recipes.filterByName(filters[param]));
        continue;
      case "tag":
        stack.push(recipes.filterByTag(filters[param]));
        continue;
      case "tags":
        stack.push(recipes.filterByTags(filters[param]));
        continue;
    }
  }

  const results = [...new Set(stack.flat(2))]
    // .filter(r => r.editable === (authorFilter === 1));

  console.log({results})

  return results
}
