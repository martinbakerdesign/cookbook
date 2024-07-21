import { recipeNodeTypes } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

const foodnetwork = {
  name: {
    tag: "h1",
    // className: "heading__title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    className: "m-RecipeInfo__a-Description--Total",
    // selector: ".recipe-meta-item-body",
  },
  amount: {
    // id: "",
    // tag: "",
    // className: "",
    selector: ".o-RecipeInfo__m-Yield .o-RecipeInfo__a-Description",
  },
  ingredients: {
    // tag: "ul",
    // id: "",
    // selector: "",
    className: "o-Ingredients__m-Body",
    contents: [
      {
        type: recipeNodeTypes.HEADER,
        tag: "h3",
        // className: "structured-ingredients__list-heading",
      },
      {
        type: recipeNodeTypes.INGREDIENT,
        // tag: "",
        className: "o-Ingredients__a-Ingredient--CheckboxLabel",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    // className: "instructions-section",
    selector: ".o-Method__m-Body>ol",
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
    $(dom, ".o-Ingredients__a-Ingredient--SelectAll").remove();
    // let headers = $$(dom, ".recipe-info-section .recipe-meta-item-header");
    // headers
    //   .filter((h) => h.textContent.toLowerCase().includes("total"))[0]
    //   .nextElementSibling.classList.add("duration--total");
    // console.log($(dom, ".duration--total"));
    // headers
    //   .filter((h) => h.textContent.toLowerCase().includes("yield"))[0]
    //   .nextElementSibling.classList.add("yield");
    // console.log($(dom, ".yield"));
  },
};

export default foodnetwork;
