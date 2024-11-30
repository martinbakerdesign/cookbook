import parseIngredient from "utils/text/parseIngredient";
import { NODES } from "schemas/recipe";
import capitalise from "utils/text/capitalise";

const maangchi = {
  name: {
    tag: "h1",
    // className: "entry-title mega-heading",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    // className: "meta-text",
    // selector: "#project-meta_1-0 .total-time .meta-text__data",
  },
  amount: {
    // id: "",
    // tag: "",
    // className: "",
    // selector: ".recipe-serving .meta-text__data",
  },
  ingredients: {
    // tag: '',
    // id: "",
    selector: ".recipe-card-ingredients",
    // className: "recipe-card-ingredients",
    contents: [
      {
        type: NODES.HEADER,
        tag: "h3",
        // className: "structured-ingredients__list-heading",
      },
      {
        type: NODES.INGREDIENT,
        tag: "li",
        // className: "structured-ingredients__list-item",
      },
    ],
  },
  method: {
    // id: "",
    selector: '.recipe-card-directions',
    // className: "recipe-card-directions",
    contents: [
      {
        type: NODES.HEADER,
        tag: "h3",
        // className: "",
        // selector: ".mntl-sc-block-html strong",
      },
      {
        type: NODES.STEP,
        tag: "li",
        // className: "mntl-sc-block-html",
      },
    ],
  },
  tags: {
    // id: "link-list_1-0",
    className: 'entry-metadata--date',
    contents: [
      {
        // tag: 'a'
        selector: `[rel=tag]`,
      },
    ],
  },
  transformations: (recipe) => {
    // Set units and quantities on ingredients
    recipe.ingredients = recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      ...(NODES.INGREDIENT === ingredient.type && parseIngredient(ingredient.text))
    }));

    if (recipe.tags && recipe.tags.length) {
      recipe.tags = [...new Set(recipe.tags.map((tag) => capitalise(tag)))];
    }

  },
  prepare: (dom) => {

    if (dom.querySelector(".mega-heading-translation") && dom.querySelector("h1.entry-title")) {
      const originalTitle = dom.querySelector(".mega-heading-translation").textContent;
  
      const title = `${dom.querySelector('h1.entry-title').textContent} (${originalTitle})`;
  
      dom.querySelector('h1.entry-title').textContent = title;
    }
  }
};

export default maangchi;
