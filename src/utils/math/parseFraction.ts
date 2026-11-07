export default function parseFraction(str: string): string|number {
  if (!str || !str.includes("/") || str.split("/").length > 2) return str;
  let nums = str.split("/").map(s => parseInt(s));
  return nums.reduce((p, c) => p / c);
}
