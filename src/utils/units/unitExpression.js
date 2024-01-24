import ingredientUnits from "data/units/ingredient";
import nonScalableUnits from "data/units/nonScalable";
import unitsToRegexGroups from "utils/units/unitsToRegexGroups.js";

const unitRegexp = `${unitsToRegexGroups({
  ...ingredientUnits,
  ...nonScalableUnits,
})}`.slice(0, -1);

export default unitRegexp;
