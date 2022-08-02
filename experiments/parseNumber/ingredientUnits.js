import metric from "./metric.js";
import imperial from "./imperial.js";
import { timeArr as time } from "./time.js";
import { UNIT_TIME, UNIT_TEMPERATURE } from "./types.js";
import relative from "./relative.js";

const all = [
  // Length
  ...metric.length,
  ...imperial.length,
  // Mass
  ...metric.mass,
  ...imperial.mass,
  // Volume
  ...metric.volume,
  ...imperial.volume,
  // Temperature
  ...metric.temperature,
  ...imperial.temperature,
  // Time
  ...time,
  // Relative,
  ...relative,
];

let units = {};
const ingredientUnits = {};

let abbrevs, plural, unit;
for (let u = 0; u < all.length; u++) {
  unit = all[u];
  abbrevs = unit.abbrev;
  plural = unit.plural;

  unit.type !== UNIT_TIME &&
    unit.type !== UNIT_TEMPERATURE &&
    ((ingredientUnits[unit.title] = unit),
    (ingredientUnits[unit.title.toLowerCase()] = unit),
    (ingredientUnits[plural] = unit),
    (ingredientUnits[capitalize(plural)] = unit));
  abbrevs.forEach(
    (a) => (
      (units[a] = unit),
      unit.type !== UNIT_TIME &&
        unit.type !== UNIT_TEMPERATURE &&
        (ingredientUnits[a] = unit)
    )
  );
}

export default ingredientUnits;

function capitalize(str = "") {
  if (!str.length) return str;
  let firstLetter = str.slice(0, 1);
  let rest = str.slice(1);

  let FirstLetter;
  switch (firstLetter) {
    case "a":
      FirstLetter = "A";
      break;
    case "b":
      FirstLetter = "B";
      break;
    case "c":
      FirstLetter = "C";
      break;
    case "d":
      FirstLetter = "D";
      break;
    case "e":
      FirstLetter = "E";
      break;
    case "f":
      FirstLetter = "F";
      break;
    case "g":
      FirstLetter = "G";
      break;
    case "h":
      FirstLetter = "H";
      break;
    case "i":
      FirstLetter = "I";
      break;
    case "j":
      FirstLetter = "J";
      break;
    case "k":
      FirstLetter = "K";
      break;
    case "l":
      FirstLetter = "L";
      break;
    case "m":
      FirstLetter = "M";
      break;
    case "n":
      FirstLetter = "N";
      break;
    case "o":
      FirstLetter = "O";
      break;
    case "p":
      FirstLetter = "P";
      break;
    case "q":
      FirstLetter = "Q";
      break;
    case "r":
      FirstLetter = "R";
      break;
    case "s":
      FirstLetter = "S";
      break;
    case "t":
      FirstLetter = "T";
      break;
    case "u":
      FirstLetter = "U";
      break;
    case "v":
      FirstLetter = "V";
      break;
    case "w":
      FirstLetter = "W";
      break;
    case "x":
      FirstLetter = "X";
      break;
    case "y":
      FirstLetter = "Y";
      break;
    case "z":
      FirstLetter = "Z";
      break;
  }

  return `${FirstLetter}${rest}`;
}
