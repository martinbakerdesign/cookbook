import RecipeFragment from "utils/recipes/fragment/RecipeFragment";

export default function scaleAmount(amount, scaleFactor) {
  if (!amount || !amount.length) return "";
  if (+scaleFactor === 1) return amount;

  let fragment = new RecipeFragment(amount);
  if (!fragment.decorations.length) return amount;

  return fragment.scale(scaleFactor);
}
