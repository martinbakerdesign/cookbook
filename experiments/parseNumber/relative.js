import { UNITSYSTEM_NONE, UNIT_RELATIVE } from "./types.js";

export const part = {
  title: "Part",
  type: UNIT_RELATIVE,
  abbrev: ["part"],
  plural: "parts",
  system: UNITSYSTEM_NONE,
  base: ["*", 1],
};

export default [part];
