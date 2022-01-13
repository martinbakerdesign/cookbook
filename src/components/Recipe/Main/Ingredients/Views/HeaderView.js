class HeaderView {
  constructor(node, view, getPos) {
    this.dom = this.contentDOM = document.createElement("h3");

    this.dom.classList[node.content.size > 0 ? "remove" : "add"]("empty");

    this.node = node;
    this.view = view;
    this.getPos = getPos;

    this.text = this.node?.content?.content[0]?.text ?? "";
    this.size = this.node?.content?.content[0]?.text.length ?? 0;

    this.dom.addEventListener("mouseenter", this.onNodeHover.bind(this));
    this.dom.addEventListener("mouseleave", this.onNodeHover.bind(this));
  }
  onNodeHover(e) {
    e.type === "mouseenter" && this.setNodeOffset();
    // this.toggleMenuButtons()
  }
  toggleMenuButtons() {
    let menu = document.querySelector("#ingredients__contextmenu");
    let headerButton = menu.querySelector('[data-command-type="header"]');
    let ingredientButton = menu.querySelector(
      '[data-command-type="ingredient"]'
    );
    headerButton.style.display = "none";
    ingredientButton.style.display = "";
  }
  setNodeOffset() {
    let root = this.dom.closest(".ingredients");
    let { top, height } = this.dom.getBoundingClientRect();
    let nodeY = top + height * 0.5 - root.getBoundingClientRect().top;
    root.style.setProperty("--node-y", `${nodeY}px`);
  }
  stopEvent() {
    return true;
  }
  update(node, decorations, innerDecorations) {
    if (node.type.name != "header") return false;

    this.dom.classList[node.content.size > 0 ? "remove" : "add"]("empty");

    this.text = node?.content?.content[0]?.text ?? "";
    this.size = this.text.length;

    return true;
  }
  getNodeIndex() {
    return Array.prototype.indexOf.call(
      this.dom.parentElement.children,
      this.dom
    );
  }
  setIndex() {
    let index = this.getNodeIndex();
    if (index !== this.dom.dataset.index) {
      this.dom.dataset.index = index;
      this.setAttrs({ index });
    }
  }
  setAttrs(attrs) {
    let transaction = this.view.state.tr.setNodeMarkup(this.getPos(), null, {
      index: this.setIndex,
      ...attrs,
    });
    let newState = this.view.state.apply(transaction);
    this.view.updateState(newState);
  }
}

export default HeaderView;
