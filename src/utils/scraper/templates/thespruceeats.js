import { recipeNodeTypes } from "schemas/recipe";
import reorderMethod from "./reorderMethod";

const thespruceeats = {
  name: {
    tag: "h1",
    className: "heading__title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    // className: "meta-text",
    selector: ".project-meta__total-time .meta-text__data",
  },
  amount: {
    // id: "",
    // tag: "",
    // className: "",
    selector: ".project-meta__recipe-serving .meta-text__data",
  },
  ingredients: {
    // tag: '',
    // id: "",
    // selector: "",
    className: "structured-ingredients__list",
    contents: [
      {
        type: recipeNodeTypes.HEADER,
        // tag: "",
        className: "structured-ingredients__list-heading",
      },
      {
        type: recipeNodeTypes.INGREDIENT,
        // tag: "",
        className: "structured-ingredients__list-item",
      },
    ],
  },
  method: {
    id: "mntl-sc-block_3-0",
    // className: "",
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
        selector: ".mntl-sc-block-group--LI .mntl-sc-block-html",
      },
    ],
  },
  tags: {
    id: "link-list_1-0",
    contents: [
      {
        className: "tag-nav__link",
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

    recipe.method = reorderMethod(recipe);
  },
  prepare(dom) {
    for (let tag of [...dom.querySelectorAll(".tag-nav__link")]) {
      tag.innerHTML = tag.textContent
        .replace("recipes", "")
        .replace("Recipes", "")
        .trim();
    }
  },
};

export default thespruceeats;
