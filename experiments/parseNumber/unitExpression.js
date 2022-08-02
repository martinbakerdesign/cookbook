import ingredientUnits from "./ingredientUnits.js";
import unitsToRegexGroups from "./unitsToRegexGroups.js";

const unitRegexp = `${unitsToRegexGroups(ingredientUnits)}`.slice(0, -1);

export default unitRegexp;
