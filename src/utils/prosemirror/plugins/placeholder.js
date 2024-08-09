import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { CHILD_NODES, NODES } from "schemas/recipe";
import { canEdit } from "store/recipe";
import { get } from "svelte/store";

function getPlaceholder(type) {
  switch (type) {
    case NODES.HEADER:
      return "Heading";
    case NODES.INGREDIENT:
      return "Ingredient";
    case NODES.STEP:
      return "Step";
    case NODES.NOTE:
      return "Note";
  }
}

function insertPlaceholders(doc) {
  let decos = [];

  doc.descendants((node, pos) => {
    if (
      !CHILD_NODES.includes(node.type.name) ||
      !!node.textContent.trim().length
    )
      return;

    const placeholder = document.createElement("span");
    placeholder.className = "placeholder select-none pointer-events-none text-text-secondary";
    placeholder.dataset.content = getPlaceholder(node.type.name);
    decos.push(
      Decoration.widget(pos+1, placeholder, {})
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
