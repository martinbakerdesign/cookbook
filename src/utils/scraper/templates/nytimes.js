import { recipeNodeTypes } from "schemas/recipe";
import reorderMethod from "./reorderMethod";

const nytimes = {
  name: {
    tag: "h1",
    className: "recipe-title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    // className: "meta-text",
    selector: ".recipe-time ~ .recipe-yield-value",
  },
  amount: {
    // id: "",
    // tag: "",
    // className: "recipe-yield-value",
    selector: ".recipe-yield-container .recipe-yield-value",
  },
  ingredients: {
    // tag: '',
    // id: "",
    // selector: "",
    className: "recipe-ingredients-wrap",
    contents: [
      {
        type: recipeNodeTypes.HEADER,
        // tag: "",
        // className: "structured-ingredients__list-heading",
        selector: ".part-name",
      },
      {
        type: recipeNodeTypes.INGREDIENT,
        // tag: "li",
        // className: "structured-ingredients__list-item",
        selector: ".recipe-ingredients li",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    className: "recipe-steps",
    contents: [
      // {
      //   type: recipeNodeTypes.HEADER,
      //   // tag: "",
      //   // className: "",
      //   selector: ".mntl-sc-block-html strong",
      // },
      {
        type: recipeNodeTypes.STEP,
        tag: "li",
        // className: "",
        // selector: ".mntl-sc-block-group--LI .mntl-sc-block-html",
      },
    ],
  },
  transformations(recipe) {
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
    let nutrition = dom
      .querySelector(".nutrition-container")
      .closest(".recipe-ingredients");
    nutrition.remove();
  },
};

export default nytimes;
