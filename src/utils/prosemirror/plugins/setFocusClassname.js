import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { CHILD_NODES } from "schemas/recipe";
import { canEdit } from "store/recipe";
import { get } from "svelte/store";

/** @param {import("prosemirror-state").EditorState} state */
function getFocusDecorations(state) {
  /** @type {import("prosemirror-view").Decoration[]} */
  const decorations = [];
  const { doc, selection } = state;
  const $canEdit = get(canEdit);

  doc.descendants((node, pos) => {
    if (!CHILD_NODES.some((childNodeType) => childNodeType === node.type.name)) return;

    const classes = [];
    if (node.content.size === 0) classes.push("empty");

    const end = pos + node.content.size + 1;
    const hasFocus = selection.empty && $canEdit && !(end < selection.from || pos > selection.to);
    if (hasFocus) classes.push("has-focus");

    if (classes.length) {
      decorations.push(
        Decoration.node(pos, pos + node.nodeSize, { class: classes.join(" ") })
      );
    }
  });

  return DecorationSet.create(doc, decorations);
}

const setFocusClassnamePlugin = new Plugin({
  props: {
    decorations(state) {
      return getFocusDecorations(state);
    },
  },
});

export {
    setFocusClassnamePlugin as default
}