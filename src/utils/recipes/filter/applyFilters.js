import uFuzzy from "@leeoniya/ufuzzy";
import user from "store/user";
import { get } from "svelte/store";

const uf = new uFuzzy({
  intraMode: 1,
});

const filterFns = {
  author: (item, author) => {
    return author === 'anyone' || (get(user).id === item?.author) === (author === 'self')
  },
  name: (item, needle) => {  
    const idxs = uf.filter([item.name], needle);

    return idxs && idxs?.length > 0;
  },
  tag: (item, tag) => {
    console.log(tag);
    return item.tags.includes(tag)
  },
  tags: (item, tags) => {
    console.log(tags)
    return tags.reduce((carry, tag) => carry && item.tags.includes(tag), true);
  },
}

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 * }} Recipe
 * @returns {Recipe[]} Filtered recipes
 */
export default function applyFilters($recipes, $searchQuery, $author) {
  const { query, tags } = $searchQuery;

  const hasQuery = query && query.length > 0;
  const hasTags = tags && Array.isArray(tags) && tags.length > 0;

  if (!hasQuery && !hasTags && $author === "anyone") return $recipes;

  const filtersToApply = {
    ...($author && {author: $author}),
    ...(hasQuery && { name: query }),
    ...(hasTags && { tags }),
  };

  let results = [...$recipes];
  for (let [key, value] of Object.entries(filtersToApply)) {
    results = filterItems(results, filterFns[key], value);
  }

  return results;
}

function filterItems (items, fn, value) {
  return [...items.filter((item) => fn(item, value))];
}