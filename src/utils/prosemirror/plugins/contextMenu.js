import { Plugin } from "prosemirror-state";
import styleToInt from "utils/style/styleToInt";

class ContextMenuView {
  constructor(items, editorView, id = "", className = "") {
    this.items = items;
    this.editorView = editorView;

    this.focus = false;

    this.dom = getContextMenuMarkup(id, className);

    this.init();
  }
  init() {
    this.appendItems(), this.update(), this.listen();
  }
  listen() {
    this.dom.addEventListener("click", this.onClick.bind(this)),
      window.addEventListener("resize", this.update.bind(this));
  }
  onClick(e) {
    e.preventDefault();
    for (let item of this.items) {
      e.target === item.dom &&
        item.command(this.editorView.state, this.editorView.dispatch);
    }
  }
  appendItems() {
    this.items.forEach(({ dom }) => this.dom.appendChild(dom));
  }
  setOffset() {
    let offset = getOffset(this.editorView);

    this.dom.style.left = `${offset[0]}px`;
    this.dom.style.top = `${offset[1]}px`;
  }
  setWidth() {
    let width = getWidth(this.dom, this.editorView.dom);

    this.dom.style.width = `${width}px`;
  }
  update() {
    let { command, dom } = this.items[0];
    // this.setOffset(), this.setWidth();

    let isHeader = command(this.editorView.state, null);
    dom.dataset.active = isHeader;
  }
  destroy() {
    // this.dom.removeEventListener("click", this.onClick.bind(this)),
    window.removeEventListener("resize", this.update.bind(this)),
      this.dom.remove();
  }
}

function getOffset(view) {
  let editorHeader = view.dom
    .closest(".recipe__editor")
    .parentElement.querySelector(".header h2.header__heading");
  let headerBox = editorHeader.getBoundingClientRect();
  let { left, top, height } = headerBox;

  return [left, top + height * 0.5];
}
function getWidth(dom, viewDom) {
  let item =
    viewDom.querySelector("ingredient") ??
    viewDom.querySelector("h3") ??
    viewDom.querySelector("dt") ??
    viewDom.querySelector("dd");
  if (!item) return viewDom.getBoundingClientRect().width;
  let padding =
    styleToInt(window.getComputedStyle(dom).getPropertyValue("padding")) ?? 6;
  let width = item.getBoundingClientRect().width + 2 * padding;

  return width;
}

function contextMenuPlugin(items, id = "", className = "") {
  return new Plugin({
    view(editorView) {
      let contextMenu = new ContextMenuView(items, editorView, id, className);
      editorView.dom.parentNode.insertBefore(contextMenu.dom, editorView.dom);
      return contextMenu;
    },
  });
}

export default contextMenuPlugin;

function getContextMenuMarkup(id, className) {
  let el = document.createElement("div");
  el.id = id;
  el.className = `context__menu ${className}`;
  el.tabIndex = -1;
  return el;
}
