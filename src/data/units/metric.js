import {
  UNIT_MASS,
  UNIT_VOLUME,
  UNIT_LENGTH,
  UNIT_TEMPERATURE,
  UNITSYSTEM_METRIC,
} from "./_types";

// TODO change plural field to array

/**
 * LENGTH
 */
export const mm = {
  title: "Millimeter",
  type: UNIT_LENGTH,
  abbrev: ["mm"],
  plural: "millimeters",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const cm = {
  title: "Centimeter",
  type: UNIT_LENGTH,
  abbrev: ["cm"],
  plural: "centimeters",
  system: UNITSYSTEM_METRIC,
  base: ["*", 10],
};
export const m = {
  title: "Meter",
  type: UNIT_LENGTH,
  abbrev: ["m"],
  plural: "meters",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1e3],
};

/**
 * MASS
 */
export const mg = {
  title: "Milligram",
  type: UNIT_MASS,
  abbrev: ["mg"],
  plural: "milligrams",
  system: UNITSYSTEM_METRIC,
  base: ["*", 0.001],
};
export const g = {
  title: "Gram",
  type: UNIT_MASS,
  abbrev: ["g"],
  plural: "grams",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const kg = {
  title: "Kilogram",
  type: UNIT_MASS,
  abbrev: ["kg"],
  plural: "kilograms",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1e3],
};

/**
 * VOLUME
 */
export const ml = {
  title: "Millilitre",
  type: UNIT_VOLUME,
  abbrev: ["mL", "ml"],
  plural: "millilitres",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const l = {
  title: "Litre",
  type: UNIT_VOLUME,
  abbrev: ["L", "l"],
  plural: "litres",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1e3],
};
export const kl = {
  title: "Kilolitre",
  type: UNIT_VOLUME,
  abbrev: ["kl", "kL"],
  plural: "kilolitres",
  system: UNITSYSTEM_METRIC,
  base: ["*", 1e6],
};
// export const cup = {
//   title: "Cup (Metric)",
//   type: UNIT_VOLUME,
//   abbrev: ["cup"],
//   system: UNITSYSTEM_METRIC,
//   base: ["*", 250],
// };

/**
 * TEMPERATURE
 */
export const C = {
  title: "Centigrade",
  type: UNIT_TEMPERATURE,
  abbrev: ["°C", "C"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const K = {
  title: "Kelvin",
  type: UNIT_TEMPERATURE,
  abbrev: ["K"],
  system: UNITSYSTEM_METRIC,
  base: ["-", 273.15],
};

const metric = {
  length: [mm, cm, m],
  mass: [mg, g, kg],
  volume: [ml, l, kl],
  temperature: [C, K],
};

export default metric;
