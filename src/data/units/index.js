import metric from "./metric";
import imperial from "./imperial";
import { timeArr as time } from "./time";
import {
  UNIT_TIME,
  UNIT_TEMPERATURE,
  UNIT_VOLUME,
  UNIT_MASS,
  UNIT_COUNT,
  UNIT_LENGTH,
} from "./_types";
import relative from "./relative";
import { capitalize } from "lodash";

export const allUnits = [
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
export let ingredientUnits = {};

export let unitsByTitle = {};
export let unitsByTitleLc = {};
export let unitsByType = {};
export let unitsBySystem = {};

let abbrevs, plural, unit;
for (let u = 0; u < allUnits.length; u++) {
  unit = allUnits[u];
  abbrevs = unit.abbrev;
  plural = unit.plural;

  units[unit.title] = unit;
  units[unit.title.toLowerCase()] = unit;
  unit.plural &&
    ((units[unit.plural] = unit), (units[capitalize(unit.plural)] = unit));
  unit.type !== UNIT_TIME &&
    unit.type !== UNIT_TEMPERATURE &&
    ((ingredientUnits[unit.title] = unit),
    (ingredientUnits[unit.title.toLowerCase()] = unit),
    (ingredientUnits[unit.plural] = unit),
    (ingredientUnits[capitalize(unit.plural)] = unit));
  abbrevs.forEach(
    (a) => (
      (units[a] = unit),
      unit.type !== UNIT_TIME &&
        unit.type !== UNIT_TEMPERATURE &&
        (ingredientUnits[a] = unit)
    )
  );
  plural != null &&
    ((ingredientUnits[plural] = unit),
    (ingredientUnits[plural.toLowerCase()] = unit));

  unitsByTitle[unit.title] = unit;
  unitsByTitleLc[unit.title] = unit;
  unitsByTitle[unit.title.toLowerCase()] = unit;

  !unitsByType[unit.type] && (unitsByType[unit.type] = []);
  unitsByType[unit.type].push(unit);

  !unitsBySystem[unit.system] && (unitsBySystem[unit.system] = []);
  unitsBySystem[unit.system].push(unit);
}

export default units;
