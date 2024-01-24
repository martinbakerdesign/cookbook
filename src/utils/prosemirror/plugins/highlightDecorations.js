import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { recipeNodeTypes } from "schemas/recipe";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";
import quantity from "utils/text/expressions/quantity";
import units from "utils/text/expressions/units";

let currentIndex;

function getQuantityDecos(doc) {
  let decos = [];

  highlightQuantity(doc).forEach((quantity) => {
    decos.push(
      Decoration.inline(quantity.pos, quantity.end, {
        class: getDecoClass(quantity),
      })
    );
  });
  // highlightUnit(doc).forEach((unit) => {
  //   decos.push(Decoration.inline(unit.from, unit.to, { class: "unit" }))
  // });

  return DecorationSet.create(doc, decos);
}
function getDecoClass(deco) {
  return "quantity";
  return `quantity${deco.unit != null ? " unit" : ""}`;
}

function quantityDeco(doc) {
  let decos = [];

  highlightQuantity(doc).forEach((quantity) => {
    decos.push(
      Decoration.inline(quantity.from, quantity.to, { class: "quantity" })
    );
  });
  highlightUnit(doc).forEach((unit) => {
    decos.push(Decoration.inline(unit.from, unit.to, { class: "unit" }));
  });

  return DecorationSet.create(doc, decos);
}

const highlightableNodes = [recipeNodeTypes.INGREDIENT, recipeNodeTypes.STEP];

function highlightQuantity(doc) {
  let decos = [];

  // For each node in the document
  let isHighlightable = false;

  doc.descendants((node, pos) => {
    // determine what can and cannot be highlighted
    highlightableNodes.includes(node.type.name) && (isHighlightable = true);
    node.type.name === recipeNodeTypes.HEADER && (isHighlightable = false);

    // return if item cannot be highlighted or is not a text node
    if (!isHighlightable || node.type.name !== "text") return;

    // make recipe framgent from text content
    let fragment = new RecipeFragment(node.text, pos);

    // add decorations
    for (let deco of fragment.decorations) {
      decos.push(deco);
    }
  });

  return decos;
}

function highlightUnit(doc) {
  let result = [];

  function record(from, to, match) {
    result.push({ from, to, match });
  }

  // For each node in the document
  let isHighlightable = false;
  let matchStr, matchIndex, start, end;

  doc.descendants((node, pos) => {
    (node.type.name === recipeNodeTypes.INGREDIENT ||
      node.type.name === recipeNodeTypes.STEP) &&
      (isHighlightable = true);
    node.type.name === recipeNodeTypes.HEADER && (isHighlightable = false);

    if (!isHighlightable || node.type.name !== "text") return;
    // Scan text nodes for quantity
    let matches = new RegExp(
      `(?<outer>(?:${quantity}[ -\\s]?)${units})[ \\s\\b]`,
      ""
    ).exec(node.text);

    if (!matches?.groups?.unit) return;
    matchStr = matches.groups.unit;
    matchIndex = matches.input.indexOf(matchStr);
    start = pos + matchIndex;
    end = start + matches.groups.unit.length;
    record(
      start, // start of unit
      end, // end of input str
      matchStr
    );
  });

  return result;
}

const highlightDecorationsPlugin = new Plugin({
  state: {
    init(_, { doc }) {
      return getQuantityDecos(doc);
    },
    apply(transaction, old) {
      return getQuantityDecos(transaction.doc);
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
    // handleClickOn(view, pos, node, nodePos, event) {
    //   let { target } = event;
    //   let container = view.dom;
    //   let tool = document.querySelector("#ingredients__translateunit");
    //   let targetIsUnit = target.className?.includes("unit") ?? false;
    //   let index = targetIsUnit
    //     ? target.closest(".recipe__editor__item").dataset.index
    //     : null;
    //   let toggle =
    //     targetIsUnit &&
    //     index === currentIndex &&
    //     tool.className.includes("show");
    //   currentIndex = index;

    //   tool.classList.remove("show");
    //   if (!targetIsUnit || toggle) return;
    //   // get & set position of clicked unit node
    //   let containerBox = container.getBoundingClientRect();
    //   let unitBox = target.getBoundingClientRect();
    //   let coords = [
    //     Math.round(unitBox.left + unitBox.width * 0.5 - containerBox.left),
    //     Math.round(unitBox.top + unitBox.height - containerBox.top),
    //   ];
    //   tool.style.left = `${coords[0]}px`;
    //   tool.style.top = `${coords[1]}px`;
    //   tool.classList.add("show");

    //   window.addEventListener("click", onClickOut);

    //   return true;
    // },
  },
});

export default highlightDecorationsPlugin;
