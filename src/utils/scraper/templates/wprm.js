import { NODES } from "schemas/recipe";
import reorderMethod from "./reorderMethod";
import $ from "utils/dom/querySelector";

const wprm = {
  name: {
    // tag: "h1",
    className: "wprm-recipe-name",
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
    // className: "yield",
    // selector: ".wprm-recipe-servings-with-unit, .wprm-recipe-servings",
    firstOf: [
        {
            className: 'wprm-recipe-servings-with-unit'
        },
        {
            className: 'wprm-recipe-servings'
        },
    ]
  },
  ingredients: {
    // tag: "ul",
    // id: "",
    // selector: "",
    className: "wprm-recipe-ingredients-container",
    contents: [
      {
        type: NODES.HEADER,
        // tag: "",
        className: "wprm-recipe-group-name",
      },
      {
        type: NODES.INGREDIENT,
        // tag: "",
        className: "wprm-recipe-ingredient",
      },
    ],
  },
  method: {
    // id: "mntl-sc-block_3-0",
    className: "wprm-recipe-instructions",
    contents: [
      {
        type: NODES.HEADER,
        // tag: "",
        className: "wprm-recipe-group-name",
        // selector: ".mntl-sc-block-html strong",
      },
      {
        type: NODES.STEP,
        // tag: "",
        className: "wprm-recipe-instruction",
        // selector: ".instructions-section-item .section-body",
      },
    ],
  },
  notes: {
    // id: "mntl-sc-block_3-0",
    className: "wprm-recipe-notes",
    delimiter: /\n+/g,
  },
  tags: {
    // className: "breadcrumbs__list",
    selector: '.wprm-recipe-course, .wprm-recipe-cuisine, .wprm-recipe-keyword',
    delimiter: /,\s?/g,
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

    recipe.notes && (recipe.notes = recipe.notes.map(note => ({ type: NODES.NOTE, text: note })));
  },
  prepare(dom) {
    // fix servings
    const servingsWithUnitEl = $(dom, '.wprm-recipe-servings-with-unit');
    const servingsEl = $(dom, '.wprm-recipe-servings');
    const notesEl = $(dom, '.wprm-recipe-notes');

    if (servingsWithUnitEl) {
      servingsWithUnitEl.innerHTML = servingsWithUnitEl.innerHTML.replace('people', 'servings').replace('person', 'serving');
    } else if (servingsEl) {
      servingsEl.innerHTML = (servingsEl.textContent + ' servings').replace(/\s+/g, ' ');
    }

    if (notesEl) {
      notesEl.innerHTML = notesEl.innerHTML.replace(/\<br\>/g, '\n');
    }
  },
};

// const ingredientEls = $$(shadow,'.wprm-recipe-ingredients-container .wprm-recipe-group-name, .wprm-recipe-ingredients-container .wprm-recipe-ingredient');
// const methodEls = $$(shadow,'.wprm-recipe-instructions .wprm-recipe-group-name, .wprm-recipe-instructions .wprm-recipe-instruction');
// const notes = cleanText($(shadow,'.wprm-recipe-notes')?.textContent ?? '').split(/\n+/g).map(note => ({ type: NODES.NOTE, text: note }));
// const yieldText = $(shadow, '.wprm-recipe-servings-with-unit')
// ? cleanText($(shadow, '.wprm-recipe-servings-with-unit').textContent)
// : $(shadow, '.wprm-recipe-servings') ? cleanText($(shadow, '.wprm-recipe-servings').textContent + ' servings')
// : '';
// const tags = $$(shadow, '.wprm-recipe-course, .wprm-recipe-cuisine, .wprm-recipe-keyword').map(el => el?.textContent ?? '').join(', ').split(',').map(tag => tag.trim());

// recipe = {
// ...blankRecipe,
// name: title,
// title,
// ingredients: ingredientEls.map(el => ({
//     type: NODES[['H1','H2','H3','H4','H5'].includes(el.tagName) ? 'HEADER' : 'INGREDIENT'],
//     text: cleanText(el.textContent)
// })),
// method: methodEls.map(el => ({
//     type: NODES[['H1','H2','H3','H4','H5'].includes(el.tagName) ? 'HEADER' : 'STEP'],
//     text: cleanText(el.textContent)
// })),
// notes,
// amount: yieldText,
// tags
// }

export {
    wprm as default
}