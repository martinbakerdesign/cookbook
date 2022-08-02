export default function unitsToRegexGroups(units) {
  return Object.keys(units)
    .sort((a, b) => (a.length > b.length ? -1 : 1))
    .join("|");
}
