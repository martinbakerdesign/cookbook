import Fraction from "fraction.js";
import limitFloat from "utils/math/limitFloat";
import units from "./index";

function convertUnit(value, fromUnitAbbrev, toUnitAbbrev) {
  let isFraction = value.toString().includes("/");
  let isRange = value.toString().includes(" to ");
  let sum = isFraction
    ? new Fraction(value).valueOf()
    : isRange
    ? [
        +value.toString().split("to")[0].trim(),
        +value.toString().split("to")[1].trim(),
      ]
    : value;

  let fromUnit = findUnitByAbbrev(fromUnitAbbrev);
  let toUnit = findUnitByAbbrev(toUnitAbbrev);

  let toBase = calculateValueToBase(sum, fromUnit.base);
  let fromBase = calculateValueFromBase(toBase, toUnit.base);

  let converted = limitFloat(fromBase, 4, 24);

  /* TODO toggle fractions/decimals depending on unit system
  ie. use decimals for kg and fractions for lbs */

  return !isFraction
    ? limitFloat(converted, 2, 8)
    : new Fraction(converted).simplify(0.1).toFraction(true);
}

function findUnitByAbbrev(abbrev) {
  return units[abbrev.toLowerCase()] || null;
}

function calculateValueToBase(value, instructions) {
  let sum = value;
  let operation, chunk;
  for (let s = 0; s < instructions.length; s++) {
    chunk = instructions[s];
    if (typeof chunk === "string") {
      operation = instructions[s];
    } else if (typeof chunk === "number") {
      if (operation === "+") {
        sum += chunk;
      } else if (operation === "-") {
        sum -= chunk;
      } else if (operation === "*") {
        sum *= chunk;
      } else {
        sum /= chunk;
      }
    } else if (Array.isArray(chunk)) {
      let subchunk;
      for (let u = 0; u < chunk.length; u++) {
        subchunk = chunk[u];
        if (typeof subchunk === "string") {
          operation = subchunk;
        } else if (typeof subchunk === "number") {
          if (operation === "+") {
            sum += subchunk;
          } else if (operation === "-") {
            sum -= subchunk;
          } else if (operation === "*") {
            sum *= subchunk;
          } else {
            sum /= subchunk;
          }
        }
      }
    }
  }

  return sum;
}
function calculateValueFromBase(value, instructions) {
  let sum = value;
  let operation, chunk;

  let adjusted = [...instructions].sort((a, b) => (Array.isArray(b) ? -1 : 0));

  for (let s = 0; s < adjusted.length; s++) {
    chunk = adjusted[s];
    if (typeof chunk === "string") {
      operation = adjusted[s];
    } else if (typeof chunk === "number") {
      if (operation === "+") {
        sum -= chunk;
      } else if (operation === "-") {
        sum += chunk;
      } else if (operation === "*") {
        sum /= chunk;
      } else {
        sum *= chunk;
      }
    } else if (Array.isArray(chunk)) {
      let subchunk;
      for (let u = 0; u < chunk.length; u++) {
        subchunk = chunk[u];
        if (typeof subchunk === "string") {
          operation = subchunk;
        } else if (typeof subchunk === "number") {
          if (operation === "+") {
            sum -= subchunk;
          } else if (operation === "-") {
            sum += subchunk;
          } else if (operation === "*") {
            sum /= subchunk;
          } else {
            sum *= subchunk;
          }
        }
      }
    }
  }

  return sum;
}

export default convertUnit;
