export default function parseYield(str) {
  if (!str || !str.length) return null;

  let regex = new RegExp(`(?<quantity>\\d+)\\s*(?<unit>.+)*s*\\b`, "gi");

  let matches = regex.exec(str);

  let result = {
    quantity: matches?.groups?.quantity ?? null,
    unit: matches?.groups?.unit ?? null,
  };

  return result;
}
