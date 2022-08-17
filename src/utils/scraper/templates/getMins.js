export default function getMins(str) {
  return str.includes("hr") && str.includes("min")
    ? str
        .split("hr")
        .map((ss, i) => (!i ? parseInt(ss) * 60 : parseInt(ss)))
        .reduce((p, c) => p + c, 0)
    : str.includes("hr")
    ? parseInt(str) * 60
    : parseInt(str);
}
