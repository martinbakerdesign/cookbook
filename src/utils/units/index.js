import metric from "./metric";
import imperial from "./imperial";
import { timeArr as time } from "./time";
import { UNIT_TIME, UNIT_TEMPERATURE } from "./types";
import relative from "./relative";

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
export let ingredientUnits = {};
let abbrevs;

export let unitsByTitle = {};
export let unitsByType = {};
export let unitsBySystem = {};

let unit;
for (let u = 0; u < all.length; u++) {
  unit = all[u];
  abbrevs = unit.abbrev;

  units[unit.title.toLowerCase()] = unit;
  unit.type !== UNIT_TIME &&
    unit.type !== UNIT_TEMPERATURE &&
    (ingredientUnits[unit.title.toLowerCase()] = unit);
  abbrevs.forEach(
    (a) => (
      (units[a] = unit),
      unit.type !== UNIT_TIME &&
        unit.type !== UNIT_TEMPERATURE &&
        (ingredientUnits[a.toLowerCase()] = unit)
    )
  );

  unitsByTitle[unit.title] = unit;

  !unitsByType[unit.type] && (unitsByType[unit.type] = []);
  unitsByType[unit.type].push(unit);

  !unitsBySystem[unit.system] && (unitsBySystem[unit.system] = []);
  unitsBySystem[unit.system].push(unit);
}

export default units;
