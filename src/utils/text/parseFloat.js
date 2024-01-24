import Fraction from "fraction.js";

function _parseFloat(str, options = { toFraction: false }) {
  if (!str || !str.length) return null;
  let float = parseFloat(str);

  return !isNaN(float)
    ? options.toFraction
      ? new Fraction(float).toFraction()
      : float
    : null;
}

export default _parseFloat;
