import Fraction from "fraction.js";

function parseFraction(str, options = { toDecimal: false }) {
  if (!str || !str.length || !str.includes("/")) return null;

  let regex = new RegExp(`\\d*\\s*\\d+/\\d+`, "i");

  let matches = regex.exec(str);

  return matches
    ? options.toDecimal
      ? new Fraction(matches[0].trim())
      : matches[0]
    : null;
}

export default parseFraction;
