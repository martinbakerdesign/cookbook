import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import quantity from "utils/text/expressions/quantity";
import units from "utils/text/expressions/units";
import $ from "utils/dom/querySelector";

let currentIndex;

function onClickOut(e) {
  if (
    e.target.closest("#method__translateunit") ||
    e.target.closest(".unit")
  )
    return;
  $("#method__translateunit").classList.remove("show");
  window.removeEventListener("click", onClickOut);
  currentIndex = null;
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

function highlightQuantity(doc) {
  let result = [];

  function record(from, to, match) {
    result.push({ from, to, match });
  }

  // For each node in the document
  let isIngredient = false;
  let matchStr, matchIndex;

  doc.descendants((node, pos) => {
    node.type.name === "ingredient" && (isIngredient = true);
    node.type.name === "header" && (isIngredient = false);

    if (!isIngredient || node.type.name !== "text") return;
    // Scan text nodes for quantity
    let matches = new RegExp(quantity, "").exec(node.text);
    if (!matches) return;
    matchStr = matches.groups.quantity;
    matchIndex = matches.input.indexOf(matchStr);
    record(
      pos + matchIndex, // start of quantity
      pos + matchIndex + matchStr.length, // end of quantity
      matchStr
    );
  });

  return result;
}

function highlightUnit(doc) {
  let result = [];

  function record(from, to, match) {
    result.push({ from, to, match });
  }

  // For each node in the document
  let isStep = false;
  let matchStr, matchIndex, start, end;

  doc.descendants((node, pos) => {
    node.type.name === "step" && (isStep = true);
    node.type.name === "header" && (isStep = false);

    if (!isStep || node.type.name !== "text") return;
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
      return quantityDeco(doc);
    },
    apply(transaction, old) {
      return quantityDeco(transaction.doc);
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
    handleClickOn(view, pos, node, nodePos, event) {
      let { target } = event;
      let container = view.dom;
      let tool = $("#method__translateunit");
      let targetIsUnit = target.className?.includes("unit") ?? false;
      let index = targetIsUnit
        ? target.closest("dd").dataset.index
        : null;
      let toggle =
        targetIsUnit &&
        index === currentIndex &&
        tool.className.includes("show");
      currentIndex = index;

      tool.classList.remove("show");
      if (!targetIsUnit || toggle) return;
      // get & set position of clicked unit node
      let containerBox = container.getBoundingClientRect();
      let unitBox = target.getBoundingClientRect();
      let coords = [
        Math.round(unitBox.left + unitBox.width * 0.5 - containerBox.left),
        Math.round(unitBox.top + unitBox.height - containerBox.top),
      ];
      tool.style.left = `${coords[0]}px`;
      tool.style.top = `${coords[1]}px`;
      tool.classList.add("show");

      window.addEventListener("click", onClickOut);

      return true;
    },
  },
});

export default highlightDecorationsPlugin;
