import ingredientUnits from "data/units/ingredient";
import unitsToRegexGroups from "utils/units/unitsToRegexGroups";

export default `(?<unit>${unitsToRegexGroups(ingredientUnits)})`;
