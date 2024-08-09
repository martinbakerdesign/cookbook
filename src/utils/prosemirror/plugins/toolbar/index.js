import { Plugin } from "prosemirror-state";
import $ from "utils/dom/querySelector";
import {refs} from 'store/recipe'

class ToolbarView {
  constructor(items = [], editorView) {
    this.items = items;
    this.editorView = editorView;

    this.focus = false;

    this.hasInit = false;

    this.dom = null;
  }
  init() {
    this.hasInit = true;
    this.dom = refs.toolbar;

    for (let item of this.items) {
      item.init(this.editorView);
    }
    this.dom && (this.listen(), this.update());
  }
  listen() {
    this.dom.addEventListener("click", this.onClick.bind(this));
  }
  onClick(e) {
    e.preventDefault();
    for (const item of this.items) {
      if (item.items) {
        item.onClick(e, this.editorView.state, this.editorView.dispatch);
        continue;
      }

      if (!item.command) continue;

      (e.target === item.dom || item.dom.contains(e.target) || item.getDom && item?.getDom().contains(e.target)) &&
        (item.passEvent
          ? item.command(e, this.editorView.state, this.editorView.dispatch)
          : item.command(this.editorView.state, this.editorView.dispatch));
    }
    this.editorView.focus();
  }
  update() {
    !this.hasInit && this.init();
    
    if (!this.items || !this.items.length) return;

    for (let item of this.items) {
      if (item.items) {
        item.update && item.update(this.editorView.state);
      } else {
        item.update && item.update(this.editorView.state);
      }
    }
  }
  destroy() {
    this.dom && this.dom.removeEventListener("click", this.onClick);
    for (let item of this.items) {
      item.destroy && item.destroy();
    }
  }
}

function toolbarPlugin(items) {
  return new Plugin({
    view(editorView) {
      const contextMenu = new ToolbarView(items, editorView);

      return contextMenu;
    },
  });
}

export default toolbarPlugin;
