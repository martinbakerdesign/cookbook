import { ingredientUnits } from "data/units";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";

export default function replaceUnitWithShorthand(text) {
  const decorations = new RecipeFragment(text, 0).decorations;
  if (!decorations.length) return text;

  const replacements = [];

  let newText = text;

  for (const decoration of decorations) {
    const { pos, unit, unitPos, unitSize } = decoration;

    if (!unit) continue;

    const unitDef = ingredientUnits[unit];
    if (!unitDef) continue;

    replacements.push({
      bounds: [pos + unitPos, pos + unitPos + unitSize],
      text: unitDef?.abbrev[0],
    });
  }

  for (const replacement of replacements.reverse()) {
    newText =
      newText.slice(0, replacement.bounds[0]) +
      replacement.text +
      newText.slice(replacement.bounds[1]);
  }

  return newText;
}
