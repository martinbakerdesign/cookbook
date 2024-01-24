import { recipeNodeTypes } from "schemas/recipe";
import scaleAmount from "utils/text/scaleAmount";
import RecipeFragment from "./fragment/RecipeFragment";

let scaled;

const fragmentTypes = [recipeNodeTypes.INGREDIENT, recipeNodeTypes.STEP];

export default function scaleRecipe(recipe = null, scaleFactor = 1) {
  if (!recipe || !Object.keys(recipe).length || scaleFactor === 1)
    return recipe ?? null;

  let amount = scaleAmount(recipe.amount, +scaleFactor);

  let scaledText;

  scaled = {
    ...recipe,
    ingredients: recipe.ingredients.map((i) => {
      if (!fragmentTypes.includes(i.type)) return i;

      scaledText = new RecipeFragment(i.text, 0).scale(+scaleFactor);

      return {
        ...i,
        text: scaledText,
      };
    }),
    method: recipe.method.map((i) => {
      if (!fragmentTypes.includes(i.type)) return i;

      scaledText = new RecipeFragment(i.text, 0).scale(+scaleFactor);

      return {
        ...i,
        text: scaledText,
      };
    }),
    amount,
  };

  return scaled;
}
