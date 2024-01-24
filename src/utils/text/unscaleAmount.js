import RecipeFragment from "utils/recipes/fragment/RecipeFragment";

export default function unscaleAmount(scaledAmount, scaleFactor) {
  if (+scaleFactor === 1) return scaledAmount;

  let fragment = new RecipeFragment(scaledAmount);

  return fragment.scale(1 / +scaleFactor);
}
