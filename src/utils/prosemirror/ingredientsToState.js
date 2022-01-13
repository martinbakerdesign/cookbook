import { INGREDIENT_TYPES } from "store/models/ingredients";
// import ingredientToContent from "./ingredientToContent";

export default function ingredientsToState(ingredients) {
  let doc = {
    type: "doc",
    content: [],
  };

  let ingredient, node, type;
  for (let i = 0; i < ingredients.length; i++) {
    ingredient = ingredients[i];
    type = types[ingredient.type];

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

const types = {
  [INGREDIENT_TYPES.INGREDIENT]: "ingredient",
  [INGREDIENT_TYPES.HEADER]: "header",
};
