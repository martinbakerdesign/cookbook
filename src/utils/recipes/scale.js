import { NODES } from "schemas/recipe";
import scaleAmount from "utils/text/scaleAmount";
import RecipeFragment from "./fragment/RecipeFragment";

let scaled;

const fragmentTypes = [NODES.INGREDIENT, NODES.STEP];

let scale = 1

export default function scaleRecipe(recipe = null, scaleFactor = 1) {
  if (!recipe || !Object.keys(recipe).length || scaleFactor === 1)
    return recipe ?? null;

  scale = +scaleFactor;

  const amount = scaleAmount(recipe.amount,scale);

  scaled = {
    ...recipe,
    ingredients: recipe.ingredients.map(scaleNode),
    method: recipe.method.map(scaleNode),
    mise_en_place: recipe.mise_en_place.map(scaleNode),
    amount,
  };

  return scaled;
}

function scaleNode (node) {
  if (!fragmentTypes.includes(node.type)) return node;

  return {
    ...node,
    text: new RecipeFragment(node.text, 0).scale(scale),
  };
}