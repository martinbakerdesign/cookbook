import { NODES } from "schemas/recipe";
import reorderMethod from "./reorderMethod";

const epicurious = {
  name: {
    tag: "h1",
    // className: "heading__title",
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
    className: "Yield-hregIY",
    // selector: '',
  },
  ingredients: {
    // tag: "ul",
    // id: "",
    // className: "o-Ingredients__m-Body",
    selector: '[data-testid="IngredientList"] .List-Xtjuf',
    contents: [
      {
        type: NODES.HEADER,
        // tag: "h3",
        className: "SubHed-ieytQr",
      },
      {
        type: NODES.INGREDIENT,
        // tag: "",
        className: "Description-dTsUqb",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    className: "InstructionsWrapper-gunQiF",
    // selector: "",
    contents: [
      {
        type: NODES.HEADER,
        // tag: "",
        className: "InstructionGroupHed-hQJUKz",
        // selector: "",
      },
      {
        type: NODES.STEP,
        // tag: "li",
        className: "InstructionBody-huDCkh",
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
    // dom.querySelector(".o-Ingredients__a-Ingredient--SelectAll").remove();
    // let headers = [
    //   ...dom.querySelectorAll(".recipe-info-section .recipe-meta-item-header"),
    // ];
    // headers
    //   .filter((h) => h.textContent.toLowerCase().includes("total"))[0]
    //   .nextElementSibling.classList.add("duration--total");
    // console.log(dom.querySelector(".duration--total"));
    // headers
    //   .filter((h) => h.textContent.toLowerCase().includes("yield"))[0]
    //   .nextElementSibling.classList.add("yield");
    // console.log(dom.querySelector(".yield"));
  },
};

export default epicurious;
