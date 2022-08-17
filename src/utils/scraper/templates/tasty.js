import { recipeNodeTypes } from "schemas/recipe";
import reorderMethod from "./reorderMethod";

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
      //   type: recipeNodeTypes.HEADER,
      //   // tag: "h3",
      //   className: "SubHed-ieytQr",
      // },
      {
        type: recipeNodeTypes.INGREDIENT,
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
      //   type: recipeNodeTypes.HEADER,
      //   // tag: "",
      //   className: "InstructionGroupHed-hQJUKz",
      //   // selector: "",
      // },
      {
        type: recipeNodeTypes.STEP,
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
    //   if (ingredient.type === recipeNodeTypes.HEADER) continue;
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
    dom.querySelector(".servings-display").innerHTML = dom
      .querySelector(".servings-display")
      .textContent.replace("for ", "")
      .trim();
  },
};

export default tasty;
