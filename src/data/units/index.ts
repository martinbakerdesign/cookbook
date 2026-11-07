import metric from "./metric";
import imperial from "./imperial";
import { timeArr as time } from "./time";
import {
  UNIT_TIME,
  UNIT_TEMPERATURE,
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
] as Unit[];

let units: Record<string, Unit> = {};
export let ingredientUnits: Record<string, Unit> = {};

export let unitsByTitle: Record<string, Unit> = {};
export let unitsByTitleLc: Record<string, Unit> = {};
export let unitsByType: Record<string, Unit[]> = {};
export let unitsBySystem: Record<string, Unit[]> = {};

let abbrevs, plural, unit: null|Unit;

for (let u = 0; u < allUnits.length; u++) {
  unit = allUnits[u] as Unit;
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
