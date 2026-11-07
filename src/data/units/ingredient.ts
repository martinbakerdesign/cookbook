import { UNIT_TIME, UNIT_TEMPERATURE } from "./_types.js";
import { allUnits } from "../units";
import { getUnitGrouping } from "./_helpers";

let units: Record<string, Unit> = {};
const ingredientUnits = getUnitGrouping(allUnits, 'type', [UNIT_TEMPERATURE, UNIT_TIME]);

export default ingredientUnits;
