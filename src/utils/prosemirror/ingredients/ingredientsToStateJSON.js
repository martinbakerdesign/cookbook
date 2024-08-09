import { NODES } from "schemas/recipe";
import { INGREDIENT_TYPES } from "store/models/ingredients";
// import ingredientToContent from "./ingredientToContent";

export default function ingredientsToStateJSON(ingredients) {
  let doc = {
    type: "doc",
    content: [],
  };
  let ingredient, node, type;

  for (let i = 0; i < ingredients.length; i++) {
    ingredient = ingredients[i];
    if (!ingredient.text.trim().length) continue;
    type = NODES[ingredient.type];
    console.log({type})

    node = {
      type,
      attrs: {
        index: i,
        ...(type === "ingredient" && {
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        }),
      },
      content: [
        {
          type: "text",
          text: ingredient.text,
        },
      ],
    };

    doc.content.push(node);
  }

  return doc;
}
