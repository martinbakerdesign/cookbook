import { undoDepth } from "prosemirror-history";
import { undo } from "prosemirror-history";
// import $ from "utils/dom/querySelector";
import {refs} from 'store/recipe'

class UndoButton {
  constructor() {
    this.command = undo;
  }
  init = function (view) {
    this.dom = refs.editorActions.undo
    // $("#recipe__header__toolbar__undo");
    this.view = view;
  }
  update = function (state) {
    if (!refs.editorActions?.undo) return;
    const count = undoDepth(state);
    refs.editorActions.undo.disabled = count === 0;
  };
  getDom = () => {
    return refs.editorActions?.undo ?? null;
  }
}

const undoButton = new UndoButton();

export default undoButton;
