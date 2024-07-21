import { redo, redoDepth } from "prosemirror-history";
import $ from "utils/dom/querySelector";

class RedoButton {
  constructor() {
    this.command = redo;
  }
  init = function (view) {
    this.dom = $("#recipe__header__toolbar__redo");
    this.view = view;
  };
  update = function (state) {
    let count = redoDepth(state);
    this.dom.disabled = count === 0;
  };
}

const redoButton = new RedoButton();

export default redoButton;
