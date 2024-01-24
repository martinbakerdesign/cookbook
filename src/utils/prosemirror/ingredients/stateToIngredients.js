import Fraction from "fraction.js";
import { recipeNodeTypes } from "src/schemas/recipe";
import { scaleFactor } from "store/";
import { INGREDIENT_TYPES } from "store/models/ingredients";
import { get } from "svelte/store";
import limitFloat from "utils/math/limitFloat";
import parseIngredient from "utils/text/parseIngredient";

export default function stateToIngredients(state) {
  const {
    doc: { content },
  } = state.toJSON();
  const _scaleFactor = get(scaleFactor);

  let ingredients = [];

  let node, type;

  for (let n = 0; n < content.length; n++) {
    node = content[n];

    if (!node.content) continue;
    type = recipeNodeTypes[node.type];

    let obj = {
      type,
      text: node.content[0].text,
      ...(node.type === "ingredient" && parseIngredient(node.content[0].text)),
    };

    if (_scaleFactor !== 1 && node.type === "ingredient") {
      let unscaledQuantity = obj.quantity / _scaleFactor;
      let quantityMatches = new RegExp(
        `(?<range>\\d+ to \\d+)|(?<fraction>\\d* *\\d+\\/\\d+)|(?<decimal>\\d+\\.\\d+)|(?<digit>\\d+)`
      ).exec(obj.text);

      let isFraction = quantityMatches.groups.fraction != null;
      let quantityString = new Fraction(obj.quantity / _scaleFactor)[
        isFraction ? "toFraction" : "valueOf"
      ]();
      let unscaledText = obj.text.replace(
        /\d* *\d+\/\d+|\d+.\d+|\d+/,
        isFraction ? quantityString : +limitFloat(quantityString, 2, 24)
      );

      obj.quantity = unscaledQuantity;
      obj.text = unscaledText;
    }

    ingredients.push(obj);
  }

  return ingredients;
}
