import { recipeNodeTypes } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $$ from "utils/dom/querySelectorAll";

const food = {
  name: {
    tag: "h1",
    className: "title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    className: "recipe-duration",
    // selector: "",
  },
  amount: {
    // id: "",
    // tag: "",
    className: "recipe-amount",
    // selector: '',
  },
  ingredients: {
    // tag: "ul",
    // id: "",
    className: "ingredients",
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
    className: "directions",
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
        // tag: "li",
        className: "direction",
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
    let metaHeadings = $$(dom, ".facts__label");
    let duration, amount;
    console.log(metaHeadings.map((m) => m.textContent));
    for (let heading of metaHeadings) {
      heading.textContent.toLowerCase().includes("ready in") &&
        (duration = heading.nextElementSibling);
      heading.textContent.toLowerCase().includes("serves") &&
        ((heading.nextElementSibling.textContent += " servings"),
        (amount = heading.nextElementSibling));
    }
    duration && duration.classList.add("recipe-duration");
    amount && amount.classList.add("recipe-amount");
  },
};

export default food;
