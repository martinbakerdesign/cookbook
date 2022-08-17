import { UNIT_TEMPERATURE } from "./_types.js";
import { allUnits } from "../units";
import capitalise from "utils/text/capitalise.js";

let units = {};
const temperatureUnits = {};

let abbrevs, plural, unit;
for (let u = 0; u < allUnits.length; u++) {
  unit = allUnits[u];
  abbrevs = unit.abbrev;
  plural = unit.plural;

  UNIT_TEMPERATURE === unit.type &&
    ((temperatureUnits[unit.title] = unit),
    (temperatureUnits[unit.title.toLowerCase()] = unit),
    (temperatureUnits[plural] = unit),
    (temperatureUnits[capitalise(plural)] = unit));
  abbrevs.forEach(
    (a) => (
      (units[a] = unit),
      UNIT_TEMPERATURE === unit.type && (temperatureUnits[a] = unit)
    )
  );
}

export default temperatureUnits;
