import Fraction from "fraction.js";
import limitFloat from "utils/math/limitFloat";
import scaleAmount from "utils/text/scaleAmount";

let scaled;

export default function scaleRecipe(recipe = null, scaleFactor = 1) {
  if (!recipe || !Object.keys(recipe).length || scaleFactor === 1)
    return recipe ?? null;

  let amount = scaleAmount(recipe.amount);

  scaled = {
    ...recipe,
    ingredients: recipe.ingredients.map((i) => {
      if (i.type === "INGREDIENTS__HEADER") return i;
      let quantityMatches = new RegExp(
        `(?<range>\\d+ to \\d+)|(?<fraction>(\\d+ )?\\d+\\/\\d+)|(?<decimal>\\d+\\.\\d+)|(?<digit>\\d+)`
      ).exec(i.text);
      let isFraction = quantityMatches?.groups?.fraction != null;
      let quantityString = new Fraction(i.quantity * scaleFactor)[
        isFraction ? "toFraction" : "valueOf"
      ]();

      return {
        ...i,
        quantity: i.quantity * scaleFactor,
        text: i.text.replace(
          /(\d* *\d+\/\d+|\d+.\d+|\d+)/,
          isFraction ? quantityString : +limitFloat(quantityString, 2, 24)
        ),
      };
    }),
    amount,
  };

  return scaled;
}
