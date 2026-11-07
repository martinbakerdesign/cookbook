import {
  UNIT_MASS,
  UNIT_VOLUME,
  UNIT_LENGTH,
  UNIT_TEMPERATURE,
  UNITSYSTEM_IMPERIAL,
} from "./_types";

// TODO change plural field to array

/**
 * LENGTH
 */
export const inch: Unit = {
  title: "Inch",
  type: UNIT_LENGTH,
  abbrev: ["in", '"'],
  plural: "inches",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 25.4],
};
export const ft: Unit = {
  title: "Foot",
  type: UNIT_LENGTH,
  abbrev: ["ft", "'"],
  plural: "Feet",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 304.8],
};
export const yard: Unit = {
  title: "Yard",
  type: UNIT_LENGTH,
  abbrev: ["yd"],
  plural: "yards",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 914.4],
};

/** MASS **/
export const oz: Unit = {
  title: "Ounce",
  type: UNIT_MASS,
  abbrev: ["oz"],
  plural: "ounces",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 28.35],
};
export const lb: Unit = {
  title: "Pound",
  type: UNIT_MASS,
  abbrev: ["lbs", "lb"],
  plural: "pounds",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 453.59],
};

/** VOLUME **/
export const tsp: Unit = {
  title: "Teaspoon",
  type: UNIT_VOLUME,
  abbrev: ["Tsp", "tsp", "t"],
  plural: "teaspoons",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 4.93],
};
export const tbsp: Unit = {
  title: "Tablespoon",
  type: UNIT_VOLUME,
  abbrev: ["Tbsp", "tbsp", "Tbs", "tbs", "T"],
  plural: "tablespoons",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 14.79],
};
export const in3: Unit = {
  title: "Cubic Inch",
  type: UNIT_VOLUME,
  abbrev: ["in3"],
  plural: "cubic inches",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 16.387064],
};
export const flOz: Unit = {
  title: "Fluid Ounce",
  type: UNIT_VOLUME,
  abbrev: ["fl-oz"],
  plural: "fluid ounces",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 29.57],
};
export const cup: Unit = {
  title: "Cup",
  type: UNIT_VOLUME,
  abbrev: ["cup"],
  plural: "cups",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 236.59],
};
export const pnt: Unit = {
  title: "Pint",
  type: UNIT_VOLUME,
  abbrev: ["pint"],
  plural: "pints",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 473.18],
};
export const qt: Unit = {
  title: "Quart",
  type: UNIT_VOLUME,
  abbrev: ["qts", "qt"],
  plural: "quarts",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 946.35],
};
export const gal: Unit = {
  title: "Gallon",
  type: UNIT_VOLUME,
  abbrev: ["gals", "gal"],
  plural: "gallons",
  system: UNITSYSTEM_IMPERIAL,
  base: ["*", 3, 785.41],
};

/** TEMPERATURE **/
export const F: Unit = {
  title: "Fahrenheit",
  type: UNIT_TEMPERATURE,
  abbrev: ["°F", "F"],
  system: UNITSYSTEM_IMPERIAL,
  base: [
    ["-", 32],
    ["/", 1.8],
  ],
};

const imperial: Record<string, Unit[]> = {
  length: [inch, ft, yard],
  mass: [oz, lb],
  volume: [tsp, tbsp, in3, flOz, cup, pnt, qt, gal],
  temperature: [F],
};

export default imperial;
