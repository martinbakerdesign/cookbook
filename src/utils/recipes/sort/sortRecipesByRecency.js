export default function sortRecipesByRecency(recipes, dir = "ASC") {
  let sorted = recipes.sort((a, b) =>
    a.created.seconds > b.created.seconds
      ? dir === "ASC"
        ? -1
        : 1
      : dir === "ASC"
      ? 1
      : -1
  );

  return sorted;
}
