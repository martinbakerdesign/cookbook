import { UNIT_TIME, UNIT_TEMPERATURE } from "./_types.js";
import { allUnits } from "../units";
import capitalise from "utils/text/capitalise.js";

let units = {};
const ingredientUnits = {};

let abbrevs, plural, unit;
for (let u = 0; u < allUnits.length; u++) {
  unit = allUnits[u];
  abbrevs = unit.abbrev;
  plural = unit?.plural ?? null;

  ![UNIT_TEMPERATURE, UNIT_TIME].includes(unit.type) &&
    ((ingredientUnits[unit.title] = unit),
    (ingredientUnits[unit.title.toLowerCase()] = unit),
    plural &&
      ((ingredientUnits[plural] = unit),
      (ingredientUnits[capitalise(plural)] = unit)));
  abbrevs.forEach(
    (a) => (
      (units[a] = unit),
      ![UNIT_TEMPERATURE, UNIT_TIME].includes(unit.type) &&
        (ingredientUnits[a] = unit)
    )
  );
}

export default ingredientUnits;
