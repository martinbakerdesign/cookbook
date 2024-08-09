import { get } from "svelte/store";
import { scaleFactor as scaleFactorStore } from "store/";
import { NODES } from "schemas/recipe";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";

export default function stateToRecipe(state) {
  const {
    doc: { content },
  } = state.toJSON();
  let [ingredients, mise_en_place, method, notes] = content;
  
  const scaleFactor = get(scaleFactorStore);

  let recipe = {
    ingredients: [],
    mise_en_place: [],
    method: [],
    notes: []
  };

  let node, type, fragment, text;

  let isScaled = +scaleFactor !== 1;

  for (let n = 0; n < ingredients.content.length; n++) {
    node = ingredients.content[n];

    if (!node || !node?.content) continue;
    type = NODES[node.type];
    text = node.content[0].text;

    let obj = {
      type,
      text,
    };

    if (isScaled && node.type === NODES.INGREDIENT) {
      fragment = new RecipeFragment(text, 0);

      obj.text = fragment.scale(1 / +scaleFactor);
    }

    recipe.ingredients.push(obj);
  }
  for (let n = 0; n < mise_en_place.content.length; n++) {
    node = mise_en_place.content[n];

    if (!node || !node?.content) continue;
    type = NODES[node.type];
    text = node.content[0].text;

    let obj = {
      type,
      text,
    };

    if (isScaled && node.type === NODES.INGREDIENT) {
      fragment = new RecipeFragment(text, 0);

      obj.text = fragment.scale(1 / +scaleFactor);
    }

    recipe.mise_en_place.push(obj);
  }
  for (let n = 0; n < method.content.length; n++) {
    node = method.content[n];

    if (!node || !node?.content) continue;
    type = NODES[node.type];
    text = node.content[0].text;

    let obj = {
      type,
      text,
    };

    if (isScaled && node.type === NODES.STEP) {
      fragment = new RecipeFragment(text, 0);

      obj.text = fragment.scale(1 / +scaleFactor);
    }

    recipe.method.push(obj);
  }
  for (let n = 0; n < notes.content.length; n++) {
    node = notes.content[n];

    if (!node || !node?.content) continue;
    type = NODES[node.type];
    text = node.content[0].text;

    let obj = {
      type,
      text,
    };

    recipe.notes.push(obj);
  }

  return recipe;
}
