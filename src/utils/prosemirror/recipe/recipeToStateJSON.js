import { recipeNodeTypes } from "schemas/recipe";
import cleanUpText from "utils/text/cleanUpText";

export default function recipeToStateJSON(recipe) {
  let doc = {
    type: "doc",
    content: [],
  };
  let node, type, ingredient, step;

  let ingredients = {
    type: recipeNodeTypes.INGREDIENTS,
    content: [
      {
        type: recipeNodeTypes.INGREDIENT,
        attrs: { index: 0 },
        content: [
          // {
          //   type: "text",
          //   text: "Ingredient",
          // },
        ],
      },
    ],
  };
  let method = {
    type: recipeNodeTypes.METHOD,
    content: [
      {
        type: recipeNodeTypes.STEP,
        attrs: { index: 0 },
        content: [
          // {
          //   type: "text",
          //   text: "Step",
          // },
        ],
      },
    ],
  };

  for (let i = 0; i < recipe.ingredients.length; i++) {
    i === 0 && (ingredients.content = []);
    ingredient = recipe.ingredients[i];
    if (!ingredient?.text?.trim()?.length) continue;
    type = recipeNodeTypes[ingredient.type];

    node = {
      type,
      attrs: {
        index: i,
      },
      content: [
        {
          type: "text",
          text: cleanUpText(ingredient.text),
        },
      ],
    };

    ingredients.content.push(node);
  }
  for (let i = 0; i < recipe.method.length; i++) {
    i === 0 && (method.content = []);
    step = recipe.method[i];
    if (!step.text.trim().length) continue;
    type = recipeNodeTypes[step.type];

    node = {
      type,
      attrs: {
        index: i,
      },
      content: [
        {
          type: "text",
          text: cleanUpText(step.text),
        },
      ],
    };

    method.content.push(node);
  }

  doc.content = [ingredients, method];

  return doc;
}
