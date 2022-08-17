import { UNIT_TIME, UNIT_TEMPERATURE } from "./_types.js";
import { allUnits } from "../units";
import capitalise from "utils/text/capitalise.js";

let units = {};
const nonScalableUnits = {};

let abbrevs, plural, unit;
for (let u = 0; u < allUnits.length; u++) {
  unit = allUnits[u];
  abbrevs = unit.abbrev;
  plural = unit.plural;

  [UNIT_TEMPERATURE, UNIT_TIME].includes(unit.type) &&
    ((nonScalableUnits[unit.title] = unit),
    (nonScalableUnits[unit.title.toLowerCase()] = unit),
    (nonScalableUnits[plural] = unit),
    (nonScalableUnits[capitalise(plural)] = unit));
  abbrevs.forEach(
    (a) => (
      (units[a] = unit),
      [UNIT_TEMPERATURE, UNIT_TIME].includes(unit.type) &&
        (nonScalableUnits[a] = unit)
    )
  );
}

export default nonScalableUnits;
