import { UNIT_TEMPERATURE } from "./_types";
import { allUnits } from "../units";
import { getUnitGrouping } from "./_helpers";

let units: UnitGrouping = {};
const temperatureUnits = getUnitGrouping(allUnits, 'type', [UNIT_TEMPERATURE]);



export default temperatureUnits;
