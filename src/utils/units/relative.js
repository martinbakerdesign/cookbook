import { UNITSYSTEM_NONE, UNIT_RELATIVE } from "./types";

export const part = {
  title: "Part",
  type: UNIT_RELATIVE,
  abbrev: ["part"],
  system: UNITSYSTEM_NONE,
  base: ["*", 1],
};

export default [part];
