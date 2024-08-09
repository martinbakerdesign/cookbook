import { Plugin } from "prosemirror-state";
import $ from "utils/dom/querySelector";
import {refs} from 'store/recipe'

class TimerPlugin {
  constructor(editorView) {
    this.editorView = editorView;
  }
  init = () => {
    this.hasInit = true;
    this.dom = this.editorView.dom;
    this.dom && (this.listen(), this.update());
  }
  listen = () => {
    this.dom.addEventListener("click", this.onClick);
  }
  onClick = (e) => {
    e.preventDefault();
    
    

    // this.editorView.focus();
  }
  update = (state, dispatch) => {
    !this.hasInit && this.init();
    

  }
  destroy = () => {
    this.dom && this.dom.removeEventListener("click", this.onClick);
  }
}

const timerPlugin = new Plugin({
    view(editorView) {
      return new TimerPlugin(editorView);
    },
  });

export {
    timerPlugin as default
}
