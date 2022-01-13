export default function filterRecipesByTags(
  recipes,
  query = { name: "", tagId: null }
) {
  if (!query || !query.name.length) return [];

  let filtered = recipes.filter((r) => {
    let matches = r.tags.filter(
      (t) =>
        query.filter(({ name, id }) =>
          query.tagId == null ? name === t : id === query.tagId
        ).length
    );

    return r.tags.length && matches.length === query.length;
  });

  return filtered;
}
