import { NODES } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

const bonappetit = {
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
        className: "ingredient",
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
    let ingredientsContainer = $(
      dom,
      '[data-testid="IngredientList"] .List-Xtjuf',
    );
    let children = ingredientsContainer.children;
    let li, thisType, prevType;
    let ingredients = [];
    for (let child of children) {
      thisType = child.className.includes("Amount-WAmkd")
        ? "amount"
        : "ingredient";
      if (!prevType || prevType === "ingredient") {
        li && ingredients.push(li);
        li = document.createElement("li");
        li.className = "ingredient";
      }
      li.textContent += " " + child.textContent;
      prevType = thisType;
    }
    ingredients.push(li);
    ingredientsContainer.innerHTML = "";
    for (let ingredient of ingredients) {
      ingredientsContainer.appendChild(ingredient);
    }

    console.log($$(ingredientsContainer, "li.ingredient"));
  },
};

export default bonappetit;
