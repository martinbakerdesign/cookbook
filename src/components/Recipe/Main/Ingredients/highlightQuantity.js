import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { ingredientUnits } from "utils/units";

const unitKeys = Object.keys(ingredientUnits).sort((a, b) =>
  a.length < b.length ? 1 : -1
);
const regex = new RegExp(
  `(?<quantity>\\d+ to \\d+|\\d*\\s*\\d+\\/\\d+|\\d+\\.\\d+|\\d+)[-\\s]*(?<unit>${unitKeys.join(
    "|"
  )})*[s(es)]*(?=\\s+|\\b)`,
  "i"
);

export default new Plugin({
  state: {
    init(_, { doc }) {
      return quantityDeco(doc);
    },
    apply(transaction, old) {
      return transaction.docChanged ? quantityDeco(transaction.doc) : old;
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
    // handlePaste(view, event, slice) {
    //   console.log({ view, event, slice });
    //   return true;
    // },
  },
});

function quantityDeco(doc) {
  let decos = [];

  highlightQuantity(doc).forEach((quantity) => {
    decos.push(
      Decoration.inline(quantity.from, quantity.to, { class: "quantity" })
    );
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
    if (isIngredient && node.type.name === "text") {
      // Scan text nodes for quantity
      let matches = regex.exec(node.text);
      if (matches) {
        matchStr = matches[0];
        matchIndex = matches.index;
        record(
          pos + matchIndex, // start of quantity
          pos + matchIndex + matchStr.length, // end of quantity
          matchStr
        );
      }
    }
  });

  return result;
}
