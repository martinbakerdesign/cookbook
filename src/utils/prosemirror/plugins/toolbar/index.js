import { Plugin } from "prosemirror-state";

class ToolbarView {
  constructor(items = [], editorView) {
    this.items = items;
    this.editorView = editorView;

    this.focus = false;

    this.dom = null;
  }
  init() {
    this.dom = document.querySelector("#recipe__header__toolbar main");
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
    for (let item of this.items) {
      if (item.items) {
        item.onClick(e, this.editorView.state, this.editorView.dispatch);
        continue;
      }
      if (!item.command) continue;
      if (e.target === item.dom) console.log(item.passEvent === true);
      (e.target === item.dom || item.dom.contains(e.target)) &&
        (item.passEvent
          ? item.command(e, this.editorView.state, this.editorView.dispatch)
          : item.command(this.editorView.state, this.editorView.dispatch));
    }
    this.editorView.focus();
  }
  update() {
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
      let contextMenu = new ToolbarView(items, editorView);
      return contextMenu;
    },
  });
}

export default toolbarPlugin;
