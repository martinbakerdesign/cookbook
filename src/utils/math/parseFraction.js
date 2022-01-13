export default function parseFraction(str) {
  if (!str || !str.includes("/") || str.split("/").length > 2) return str;
  let nums = str.split("/");
  return nums.reduce((p, c) => p / c);
}
