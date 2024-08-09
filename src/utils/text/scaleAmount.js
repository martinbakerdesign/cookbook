import RecipeFragment from "utils/recipes/fragment/RecipeFragment";

function getText (amount) {
  return amount?.text ?? amount;
}

export default function scaleAmount(amount, scaleFactor) {
  if (!amount || !getText(amount).length) return "";
  if (+scaleFactor === 1) return getText(amount);

  const fragment = new RecipeFragment(getText(amount));
  if (!fragment.decorations.length) return amount;

  return fragment.scale(scaleFactor);
}
