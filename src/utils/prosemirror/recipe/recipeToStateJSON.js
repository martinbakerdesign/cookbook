import { NODES } from "schemas/recipe";
import cleanUpText from "utils/text/cleanUpText";

export default function recipeToStateJSON(recipe) {
  const doc = {
    type: "doc",
    content: [],
  };
  let node, type, ingredient, step;

  const ingredients = {
    type: NODES.INGREDIENTS,
    content: [
      {
        type: NODES.INGREDIENT,
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
  const mise_en_place = {
    type: NODES.MISE_EN_PLACE,
    content: [
      {
        type: NODES.INGREDIENT,
        attrs: { index: 0 },
        content: [],
      },
    ],
  }
  const method = {
    type: NODES.METHOD,
    content: [
      {
        type: NODES.STEP,
        attrs: { index: 0 },
        content: [],
      },
    ],
  };
  const notes = {
    type: NODES.NOTES,
    content: [
      {
        type: NODES.NOTE,
        attrs: { index: 0 },
        content: [],
      },
    ],
  }

  for (let i = 0; i < recipe.ingredients.length; i++) {
    i === 0 && (ingredients.content = []);
    ingredient = recipe.ingredients[i];
    if (!ingredient?.text?.trim()?.length) continue;
    type = NODES[ingredient.type];

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
  for (let i = 0; i < recipe.mise_en_place.length; i++) {
    i === 0 && (mise_en_place.content = []);
    node = recipe.mise_en_place[i];
    if (!node.text.trim().length) continue;
    type = NODES[node.type];

    node = {
      type,
      attrs: {
        index: i,
      },
      content: [
        {
          type: "text",
          text: cleanUpText(node.text),
        },
      ],
    };

    mise_en_place.content.push(node);
  }
  for (let i = 0; i < recipe.method.length; i++) {
    i === 0 && (method.content = []);
    step = recipe.method[i];
    if (!step.text.trim().length) continue;
    type = NODES[step.type];

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
  for (let i = 0; i < recipe.notes.length; i++) {
    i === 0 && (notes.content = []);
    node = recipe.notes[i];
    if (!node.text.trim().length) continue;
    type = NODES[node.type];

    node = {
      type,
      attrs: {
        index: i,
      },
      content: [
        {
          type: "text",
          text: cleanUpText(node.text),
        },
      ],
    };

    notes.content.push(node);
  }

  doc.content = [ingredients, mise_en_place, method, notes];

  return doc;
}
