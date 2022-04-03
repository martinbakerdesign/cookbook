export default function unitsToRegexGroups(units) {
  // return Object.entries(units)
  //   .map(
  //     ([title, { plural, abbrev }]) =>
  //       `(?<${title.replace(/ /g, "")}>${plural + "|" ?? ""}${
  //         title + "|"
  //       }${abbrev.join("|")})`
  //   )
  //   .join("|");
  return Object.keys(units)
    .sort((a, b) => (a.length > b.length ? -1 : 1))
    .join("|");
}
