import { NODES } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $ from "utils/dom/querySelector";

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
        type: NODES.HEADER,
        // tag: "",
        // className: "structured-ingredients__list-heading",
        selector: ".part-name",
      },
      {
        type: NODES.INGREDIENT,
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
      //   type: NODES.HEADER,
      //   // tag: "",
      //   // className: "",
      //   selector: ".mntl-sc-block-html strong",
      // },
      {
        type: NODES.STEP,
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
    //   if (ingredient.type === NODES.HEADER) continue;
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
    let nutrition = $(dom, ".nutrition-container").closest(".recipe-ingredients");
    nutrition.remove();
  },
};

export default nytimes;
