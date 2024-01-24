export default function parseServingUnit(src) {
  if (!src || !src.length) return null;

  const regex = new RegExp(`(?<quantity>\\d+\/\\d+|\\d+.\\d+|\\d+)*[ \-]*`);

  return src.replace(regex, "");
}
