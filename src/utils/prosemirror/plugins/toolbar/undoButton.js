import { undoDepth } from "prosemirror-history";
import { undo } from "prosemirror-history";

class UndoButton {
  constructor() {
    this.command = undo;
  }
  init = function (view) {
    this.dom = document.querySelector("#recipe__header__toolbar__undo");
    this.view = view;
  }
  update = function (state) {
    let count = undoDepth(state);
    this.dom.disabled = count === 0;
  };
}

const undoButton = new UndoButton();

export default undoButton;
