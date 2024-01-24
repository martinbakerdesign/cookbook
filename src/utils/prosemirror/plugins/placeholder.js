import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { recipeNodeTypes } from "schemas/recipe";

const containerTypes = [
  recipeNodeTypes.HEADER,
  recipeNodeTypes.INGREDIENT,
  recipeNodeTypes.STEP,
];
function getPlaceholder(name) {
  switch (name) {
    case "header":
      return "Header";
    case "ingredient":
      return "Ingredient";
    case "step":
      return "Method";
  }
}

function insertPlaceholders(doc) {
  let decos = [];

  doc.descendants((node, pos) => {
    if (
      !containerTypes.includes(node.type.name) ||
      !!node.textContent.trim().length
    )
      return;
    decos.push(
      Decoration.widget(pos + 1, document.createElement("placeholder"), {})
    );
  });

  return DecorationSet.create(doc, decos);
}

export default new Plugin({
  state: {
    init(_, { doc }) {
      return insertPlaceholders(doc);
    },
    apply(transaction, old) {
      return insertPlaceholders(transaction.doc);
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
  },
});
