export default function applySort(recipes, [, key, dir]) {
  if (!key || !dir) return recipes;

  let aKey, bKey;
  return recipes.sort((a, b) => {
    (aKey = key), (bKey = key);
    if (key === "last_edited") {
      !a[key] && (aKey = "created");
      !b[key] && (bKey = "created");
    }
    return a[aKey] > b[bKey]
      ? dir === "ASC"
        ? 1
        : -1
      : dir === "DESC"
      ? 1
      : -1;
  });
}
