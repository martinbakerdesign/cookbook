import { recipeNodeTypes } from "schemas/recipe";
import getMins from "./getMins";
import reorderMethod from "./reorderMethod";

const sbs = {
  name: {
    tag: "h1",
    id: "page-title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    // className: "meta-text",
    selector: '[itemprop="cookTime"]~.field',
  },
  amount: {
    // id: "",
    // tag: "",
    // className: "",
    selector: '[itemprop="recipeYield"]',
  },
  ingredients: {
    // tag: '',
    // id: "",
    // selector: "",
    className: "field-name-field-ingredients",
    contents: [
      {
        type: recipeNodeTypes.HEADER,
        tag: "p",
        // className: "structured-ingredients__list-heading",
      },
      {
        type: recipeNodeTypes.INGREDIENT,
        tag: "li",
        // className: "structured-ingredients__list-item",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    // className: "",
    selector: '[itemprop="recipeInstructions"]',
    contents: [
      {
        type: recipeNodeTypes.HEADER,
        tag: "h4",
        // className: "",
        // selector: "h4",
      },
      {
        type: recipeNodeTypes.STEP,
        // tag: "li",
        // className: "",
        selector: "li, p",
      },
    ],
  },
  transformations: (recipe) => {
    // Set units and quantities on ingredients
    // let parsed, ingredient;
    // for (let i in recipe.ingredients) {
    //   ingredient = recipe.ingredients[i];
    //   if (ingredient.type === recipeNodeTypes.HEADER) continue;
    //   parsed = parseIngredient(ingredient.text);
    //   recipe.ingredients[i] = {
    //     ...ingredient,
    //     ...parsed,
    //   };
    // }
    // Reorder method
    // recipe.method = reorderMethod(recipe);
  },
  prepare(dom) {
    let amount = dom.querySelector('[itemprop="recipeYield"]');
    amount.innerHTML = amount.textContent.trim() + " serves";

    let prepTimeStr = dom
      .querySelector('[itemprop="prepTime"]~.field')
      .textContent.trim();
    let prepTimeMins = getMins(prepTimeStr);
    let cookTimeStr = dom
      .querySelector('[itemprop="cookTime"]~.field')
      .textContent.trim();
    let cookTimeMins = getMins(cookTimeStr);

    let totalMins = prepTimeMins + cookTimeMins;
    let totalHrs = Math.floor(totalMins / 60);

    let totalTimeStr =
      totalHrs > 0
        ? `${totalHrs}hrs${totalMins % 60 > 0 ? ` ${totalMins % 60}mins` : ""}`
        : `${totalMins}mins`;

    dom.querySelector('[itemprop="cookTime"]~.field').innerHTML = totalTimeStr;

    let method = dom.querySelector(".field-name-field-cooking-instructions");

    let steps = [...method.querySelectorAll("ol li, p")];
    let hasLi = !!steps.filter((el) => el.tagName === "LI").length;
    hasLi &&
      ((steps = steps.filter((el) => el.tagName === "LI")),
      method.querySelectorAll("p").forEach((p) => p.remove()),
      (method = method.querySelector("ol")));
    let strong, hasStrong, heading;
    for (let step of steps) {
      strong = step.querySelector("strong");
      hasStrong = strong != null;
      if (!hasStrong) continue;
      heading = document.createElement("h4");
      heading.textContent = strong.textContent;
      strong.remove();
      method.insertBefore(heading, step);

      step.textContent.slice(0, 2) === ", " &&
        (step.innerHTML =
          step.textContent.slice(2, 3).toUpperCase() +
          step.textContent.slice(3));
    }
  },
};

export default sbs;
