import { NODES } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $ from "utils/dom/querySelector";

const tasty = {
  name: {
    tag: "h1",
    className: "recipe-name",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    // className: "m-RecipeInfo__a-Description--Total",
    selector:
      ".InfoSliceList-eUygYt .InfoSliceListItem-gLRTcw:last-child .InfoSliceValue-gTzwxg",
  },
  amount: {
    // id: "",
    // tag: "",
    className: "servings-display",
    // selector: '',
  },
  ingredients: {
    // tag: "ul",
    // id: "",
    className: "ingredients__section",
    // selector: '[data-testid="IngredientList"] .List-Xtjuf',
    contents: [
      // {
      //   type: NODES.HEADER,
      //   // tag: "h3",
      //   className: "SubHed-ieytQr",
      // },
      {
        type: NODES.INGREDIENT,
        // tag: "",
        className: "ingredient",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    className: "prep-steps",
    // selector: "",
    contents: [
      // {
      //   type: NODES.HEADER,
      //   // tag: "",
      //   className: "InstructionGroupHed-hQJUKz",
      //   // selector: "",
      // },
      {
        type: NODES.STEP,
        tag: "li",
        // className: "InstructionBody-huDCkh",
        // selector: ".instructions-section-item .section-body",
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

    recipe.method = reorderMethod(recipe);
  },
  prepare(dom) {
    $(dom, ".servings-display").innerHTML = $(dom, ".servings-display")
      .textContent.replace("for ", "")
      .trim();
  },
};

export default tasty;
