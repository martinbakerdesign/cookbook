import parseIngredient from "utils/text/parseIngredient";
import { NODES } from "schemas/recipe";

const seriouseats = {
  name: {
    tag: "h1",
    className: "heading__title",
  },
  duration: {
    // tag: "",
    // id: "meta-text_1-0",
    // className: "meta-text",
    selector: "#project-meta_1-0 .total-time .meta-text__data",
  },
  amount: {
    // id: "",
    // tag: "",
    // className: "",
    selector: ".recipe-serving .meta-text__data",
  },
  ingredients: {
    // tag: '',
    // id: "",
    // selector: "",
    className: "structured-ingredients",
    contents: [
      {
        type: NODES.HEADER,
        // tag: "",
        className: "structured-ingredients__list-heading",
      },
      {
        type: NODES.INGREDIENT,
        // tag: "",
        className: "structured-ingredients__list-item",
      },
    ],
  },
  method: {
    // id: "",
    selector: '#section--instructions_1-0 ol',
    // className: "",
    contents: [
      {
        type: NODES.HEADER,
        // tag: "",
        // className: "",
        selector: ".mntl-sc-block-html strong",
      },
      {
        type: NODES.STEP,
        // tag: "",
        className: "mntl-sc-block-html",
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
    let parsed, ingredient;
    for (let i in recipe.ingredients) {
      ingredient = recipe.ingredients[i];
      if (ingredient.type === NODES.HEADER) continue;
      parsed = parseIngredient(ingredient.text);
      recipe.ingredients[i] = {
        ...ingredient,
        ...parsed,
      };
    }
    // Reorder method
    let method = [];
    let step, nextStep;
    for (let m = 0; m < recipe.method.length; m++) {
      step = recipe.method[m];
      nextStep = m < recipe.method.length - 1 ? recipe.method[m + 1] : null;

      if (nextStep && nextStep.type === NODES.HEADER) {
        method.push({ ...nextStep, text: nextStep.text.trim().slice(0, -1) });
        method.push({
          ...step,
          text: step.text.replace(nextStep.text, "").trim(),
        });
        m++;
      } else {
        method.push({ ...step });
      }
    }
    recipe.method = [...method];
  },
};

export default seriouseats;
