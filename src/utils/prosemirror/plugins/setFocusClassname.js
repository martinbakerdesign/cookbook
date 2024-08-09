import { Plugin } from "prosemirror-state";
import { CHILD_NODES } from "schemas/recipe";
import { canEdit } from "store/recipe";
import { get } from "svelte/store";
import ts from "typescript";
import $$ from "utils/dom/querySelectorAll";

const setFocusClassnamePlugin = new Plugin({
  view(editorView) {
    return new FocusClassname(editorView);
  },
});

class FocusClassname {
  constructor(view) {
    this.update(view, null);
  }

  update(view, lastState) {
    const { state, dispatch } = view;

    // Don't do anything if the document/selection didn't change
    if (
      lastState &&
      lastState.doc.eq(state.doc) &&
      lastState.selection.eq(state.selection)
    )
      return;

    const {
      selection: { empty, from, to },
    } = state;

    if (!empty) {
      for (const el of $$(".has-focus")) {
        el.classList.remove("has-focus");
      }
      return;
    }

    const $canEdit = get(canEdit);

    let tr = state.tr;
    state.doc.descendants((node, pos) => {
        if (!CHILD_NODES.includes(node.type.name)) return;
        const end = pos + node.content.size + 1;
        tr = tr.setNodeMarkup(pos, null, {
          hasFocus: $canEdit && !(end < from || pos > to),
          isEmpty: node.content.size === 0
        })
    });

    tr.setMeta('setFocus', true);

    dispatch(tr)
    
  }

  destroy() {
  }
}

export {
    setFocusClassnamePlugin as default
}