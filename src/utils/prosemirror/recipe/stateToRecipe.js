import { get } from "svelte/store";
import { scaleFactor as scaleFactorStore } from "store/";
import { recipeNodeTypes } from "schemas/recipe";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";

export default function stateToRecipe(state) {
  const {
    doc: { content },
  } = state.toJSON();
  let [ingredients, method] = content;
  const scaleFactor = get(scaleFactorStore);

  let recipe = {
    ingredients: [],
    method: [],
  };

  let node, type, fragment, text;

  let isScaled = +scaleFactor !== 1;

  for (let n = 0; n < ingredients.content.length; n++) {
    node = ingredients.content[n];

    if (!node || !node?.content) continue;
    type = recipeNodeTypes[node.type];
    text = node.content[0].text;

    let obj = {
      type,
      text,
    };

    if (isScaled && node.type === recipeNodeTypes.INGREDIENT) {
      fragment = new RecipeFragment(text, 0);

      obj.text = fragment.scale(1 / +scaleFactor);
    }

    recipe.ingredients.push(obj);
  }
  for (let n = 0; n < method.content.length; n++) {
    node = method.content[n];

    if (!node || !node?.content) continue;
    type = recipeNodeTypes[node.type];
    text = node.content[0].text;

    let obj = {
      type,
      text,
    };

    if (isScaled && node.type === recipeNodeTypes.STEP) {
      fragment = new RecipeFragment(text, 0);

      obj.text = fragment.scale(1 / +scaleFactor);
    }

    recipe.method.push(obj);
  }

  return recipe;
}
