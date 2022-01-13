import {
  UNIT_MASS,
  UNIT_VOLUME,
  UNIT_LENGTH,
  UNIT_TEMPERATURE,
  UNITSYSTEM_IMPERIAL,
} from "./types";

/**
 * LENGTH
 */
export const inch = {
  title: "Inch",
  type: UNIT_LENGTH,
  abbrev: ["in", '"'],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 25.4],
};
export const ft = {
  title: "Feet",
  type: UNIT_LENGTH,
  abbrev: ["ft", "'"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 304.8],
};
export const yard = {
  title: "Yard",
  type: UNIT_LENGTH,
  abbrev: ["yd"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 914.4],
};

/** MASS **/
export const oz = {
  title: "Ounce",
  type: UNIT_MASS,
  abbrev: ["oz"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 28.35],
};
export const lb = {
  title: "Pound",
  type: UNIT_MASS,
  abbrev: ["lb"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 453.59],
};

/** VOLUME **/
export const tsp = {
  title: "Teaspoon",
  type: UNIT_VOLUME,
  abbrev: ["tsp", "t"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 4.93],
};
export const tbsp = {
  title: "Tablespoon",
  type: UNIT_VOLUME,
  abbrev: ["tbsp", "tbs", "Tbsp", "Tbs", "T"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 14.79],
};
export const in3 = {
  title: "Cubic Inch",
  type: UNIT_VOLUME,
  abbrev: ["in3"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 16.387064],
};
export const flOz = {
  title: "Fluid Ounce",
  type: UNIT_VOLUME,
  abbrev: ["fl-oz"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 29.57],
};
export const cup = {
  title: "Cup",
  type: UNIT_VOLUME,
  abbrev: ["cup"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 236.59],
};
export const pnt = {
  title: "Pint",
  type: UNIT_VOLUME,
  abbrev: ["pint"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 473.18],
};
export const qt = {
  title: "Quart",
  type: UNIT_VOLUME,
  abbrev: ["qt"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 946.35],
};
export const gal = {
  title: "Gallon",
  type: UNIT_VOLUME,
  abbrev: ["gal"],
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 3, 785.41],
};

/** TEMPERATURE **/
export const F = {
  title: "Degrees Fahrenheit",
  type: UNIT_TEMPERATURE,
  abbrev: ["F"],
  system: UNITSYSTEM_IMPERIAL,
  base: [
    ["-", 32],
    ["/", 1.8],
  ],
};

const imperial = {
  length: [inch, ft, yard],
  mass: [oz, lb],
  volume: [tsp, tbsp, in3, flOz, cup, pnt, qt, gal],
  temperature: [F],
};

export default imperial;
