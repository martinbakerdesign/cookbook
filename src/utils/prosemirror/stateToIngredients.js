import { INGREDIENT_TYPES } from "store/models/ingredients";
import parseIngredient from "utils/text/parseIngredient";
import contentToIngredient from "./contentToIngredient";

export default function proseToIngredients(state) {
  const {
    doc: { content },
  } = state.toJSON();

  let ingredients = [];

  let node, type;
  for (let n = 0; n < content.length; n++) {
    node = content[n];

    if (!node.content) continue;
    type = types[node.type];

    let obj = {
      type,
      text: node.content[0].text,
      ...(node.type === "ingredient" && parseIngredient(node.content[0].text)),
    };

    ingredients.push(obj);
  }

  return ingredients;
}

const types = {
  ingredient: INGREDIENT_TYPES.INGREDIENT,
  header: INGREDIENT_TYPES.HEADER,
};
