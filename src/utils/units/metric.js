import {
  UNIT_MASS,
  UNIT_VOLUME,
  UNIT_LENGTH,
  UNIT_TEMPERATURE,
  UNITSYSTEM_METRIC,
} from "./types";

/**
 * LENGTH
 */
export const mm = {
  title: "Millimeter",
  type: UNIT_LENGTH,
  abbrev: ["mm"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const cm = {
  title: "Centimeter",
  type: UNIT_LENGTH,
  abbrev: ["cm"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 10],
};
export const m = {
  title: "Meter",
  type: UNIT_LENGTH,
  abbrev: ["m"],
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
  system: UNITSYSTEM_METRIC,
  base: ["*", 0.001],
};
export const g = {
  title: "Gram",
  type: UNIT_MASS,
  abbrev: ["g"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const kg = {
  title: "Kilogram",
  type: UNIT_MASS,
  abbrev: ["kg"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1e6],
};

/**
 * VOLUME
 */
export const ml = {
  title: "Millilitre",
  type: UNIT_VOLUME,
  abbrev: ["ml"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const l = {
  title: "Litre",
  type: UNIT_VOLUME,
  abbrev: ["l"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1e3],
};
export const kl = {
  title: "Kilolitre",
  type: UNIT_VOLUME,
  abbrev: ["kl"],
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
  title: "Degrees Centigrade",
  type: UNIT_TEMPERATURE,
  abbrev: ["C", "°C"],
  system: UNITSYSTEM_METRIC,
  base: ["*", 1],
};
export const K = {
  title: "Degrees Kelvin",
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
