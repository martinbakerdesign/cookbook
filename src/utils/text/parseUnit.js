import ingredientUnits from "data/units/ingredient";

export default function parseUnit(str) {
  if (!str || !str.length) return null;
  let keys = Object.keys(ingredientUnits).sort((a, b) =>
    a.length < b.length ? 1 : -1
  );
  let regex = new RegExp(`\\d+\\s*(?<unit> ${keys.join("|")})s*\\b`, "gi");

  let matches = regex.exec(str);

  return ingredientUnits[matches?.groups.unit] ?? null;
}
