import schema from "schemas/method";
import { writable } from "svelte/store";
import {
  getButton,
  getHeaderTogglePlugin,
  toggleBlockType,
  domIcon,
  getOffset,
} from "../toggleHeader";

export const focus = writable(false);

class MethodHeaderToggleView {
  constructor(items, editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = getButton(
      "method__toggleheader",
      "context context--method",
      "toggleheader"
    );

    this.init();
  }
  init() {
    this.appendItems(), this.update(), this.listen();
  }
  listen() {
    console.log(this.dom);
    this.dom.addEventListener("click", this.onClick.bind(this));
    window.addEventListener("resize", this.setOffset.bind(this));
  }
  onClick(e) {
    console.log("click");
    e.preventDefault();
    let { command } = this.items[0];
    command(this.editorView.state, this.editorView.dispatch);
    this.editorView.focus();
  }
  appendItems() {
    this.items.forEach(({ dom }) => this.dom.appendChild(dom));
  }
  setOffset() {
    let offset = getOffset(this.editorView);
    console.log(offset);

    this.dom.style.left = `${offset[0]}px`;
    this.dom.style.top = `${offset[1]}px`;
  }
  update() {
    let { command, dom } = this.items[0];
    this.setOffset();

    // focus.set(true);
    let isHeader = command(this.editorView.state, null);
    dom.dataset.active = isHeader;
  }
  destroy() {
    this.dom.removeEventListener("click", this.onClick.bind(this));
    this.dom.remove();
  }
}

export function toggleFocus(e) {
  if (
    (e.type === "click" && e.target.closest(".ingredients")) ||
    (e.type === "keyup" && e.key !== "Tab" && e.keyCode !== 9)
  )
    return;
  focus.set(false);
}

const toggleMethodHeader = getHeaderTogglePlugin(
  [
    {
      command: toggleBlockType([schema.nodes.step, schema.nodes.header]),
      dom: domIcon("header", "Header"),
      name: "Header",
    },
  ],
  MethodHeaderToggleView
);

export default toggleMethodHeader;
