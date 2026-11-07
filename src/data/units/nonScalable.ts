import { UNIT_TIME, UNIT_TEMPERATURE } from "./_types";
import { allUnits } from "../units";
import { getUnitGrouping } from './_helpers';

const nonScalableUnits = getUnitGrouping(allUnits, 'type', [UNIT_TEMPERATURE, UNIT_TIME]);

export default nonScalableUnits;
