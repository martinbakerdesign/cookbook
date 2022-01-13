export default function applySort(recipes, [, key, dir]) {
  if (!key || !dir) return recipes;

  return recipes.sort((a, b) =>
    a[key] > b[key] ? (dir === "ASC" ? 1 : -1) : dir === "DESC" ? 1 : -1
  );
}
