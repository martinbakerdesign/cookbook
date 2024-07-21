import { doc } from "firebase/firestore";
import { recipeNodeTypes } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

const allrecipes = {
  name: {
    tag: "h1",
    // className: "heading__title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    className: "duration--total",
    // selector: ".recipe-meta-item-body",
  },
  amount: {
    // id: "",
    // tag: "",
    className: "yield",
    // selector: ".project-meta__recipe-serving .meta-text__data",
  },
  ingredients: {
    tag: "ul",
    // id: "",
    // selector: "",
    className: "ingredients-section",
    contents: [
      // {
      //   type: recipeNodeTypes.HEADER,
      //   // tag: "",
      //   className: "structured-ingredients__list-heading",
      // },
      {
        type: recipeNodeTypes.INGREDIENT,
        // tag: "",
        className: "ingredients-item-name",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    className: "instructions-section",
    contents: [
      // {
      //   type: recipeNodeTypes.HEADER,
      //   // tag: "",
      //   // className: "",
      //   selector: ".mntl-sc-block-html strong",
      // },
      {
        type: recipeNodeTypes.STEP,
        // tag: "",
        // className: "",
        selector: ".instructions-section-item .section-body",
      },
    ],
  },
  tags: {
    className: "breadcrumbs__list",
    contents: [
      {
        className: "recipe-tag",
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
    let headers = $$(dom, ".recipe-info-section .recipe-meta-item-header");
    headers
      .filter((h) => h.textContent.toLowerCase().includes("total"))[0]
      .nextElementSibling.classList.add("duration--total");
    headers
      .filter((h) => h.textContent.toLowerCase().includes("yield"))[0]
      .nextElementSibling.classList.add("yield");

    let breadCrumbs = $$(dom, ".breadcrumbs__item").filter(
      (b) =>
        !b.className.includes("visually-hidden") &&
        b.textContent.trim() !== "Home" &&
        b.textContent.trim() !== "Recipes"
    );
    for (let breadCrumb of breadCrumbs) {
      breadCrumb.classList.add("recipe-tag");
    }
  },
};

export default allrecipes;
