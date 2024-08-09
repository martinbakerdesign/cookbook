import { redo, redoDepth } from "prosemirror-history";
import {refs} from 'store/recipe'

class RedoButton {
  constructor() {
    this.command = redo;
  }
  init = function (view) {
    this.dom = refs.editorActions.redo
    this.view = view;
  };
  update = function (state) {
    if (!refs.editorActions?.redo) return;
    const count = redoDepth(state);
    refs.editorActions.redo.disabled = count === 0;
  };
  getDom = () => {
    return refs.editorActions?.redo ?? null;
  }
}

const redoButton = new RedoButton();

export default redoButton;
