import { recipeNodeTypes } from "schemas/recipe";

export default function reorderMethod(recipe) {
  let method = [];
  let step, nextStep;
  for (let m = 0; m < recipe.method.length; m++) {
    step = recipe.method[m];
    nextStep = m < recipe.method.length - 1 ? recipe.method[m + 1] : null;

    if (nextStep && nextStep.type === recipeNodeTypes.HEADER) {
      method.push({ ...nextStep, text: nextStep.text.trim().slice(0, -1) });
      method.push({
        ...step,
        text: step.text.replace(nextStep.text, "").trim(),
      });
      m++;
    } else {
      method.push({ ...step });
    }
  }

  return [...method];
}
