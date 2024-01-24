import Fraction from "fraction.js";
import getFraction from "./getFraction";

export default function parseQuantity(matches) {
  // console.log({ matches });
  return matches.groups.quantity != null
    ? matches.groups.range
      ? parseRange(matches.groups.range)
      : matches.groups.fraction
      ? new Fraction(matches.groups.fraction.replace(/\s+/gi, " ")).valueOf()
      : +matches.groups.quantity
    : null;
}

function parseRange(str) {
  let range = (str.includes("-") ? str.split("-") : str.split("to")).map((v) =>
    v.includes("/")
      ? new Fraction(getFraction(v).replace(/\s+/gi, " ")).valueOf()
      : +v
  );

  return range;
}
