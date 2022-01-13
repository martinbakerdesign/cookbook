import limitFloat from "utils/math/limitFloat";
import parseIngredient from "utils/text/parseIngredient";
import { ingredientUnits, unitsByType } from "utils/units/";
import convertUnit from "utils/units/convert";
import pluralize from "pluralize";

class IngredientView {
  constructor(node, view, getPos) {
    this.dom = this.contentDOM = document.createElement("ingredient");

    this.dom.classList[node.content.size > 0 ? "remove" : "add"]("empty");

    this.quantity = 0;
    this.unit = "";

    this.node = node;
    this.view = view;
    this.getPos = getPos;

    this.quantitySpan = null;
    this.translateToggle = null;
    this.translateSelect = null;

    this.pos = [0, 0];

    this.unit = this.node.attrs.unit;
    this.quantity = this.node.attrs.quantity;
    this.text = this.node?.content?.content[0]?.text ?? "";
    this.size = this.node?.content?.content[0]?.text.length ?? 0;

    this.quantityFrom = 0;
    this.quantityTo = 0;

    this.dom.addEventListener("mouseenter", this.onNodeHover.bind(this));
    this.dom.addEventListener("mouseleave", this.onNodeHover.bind(this));
  }
  onNodeHover(e) {
    e.type === "mouseenter" && this.setNodeOffset();
    // this.toggleMenuButtons());
    this.onQuantityHover(e);
  }
  toggleMenuButtons() {
    let menu = document.querySelector("#ingredients__contextmenu");
    let headerButton = menu.querySelector('[data-command-type="header"]');
    let ingredientButton = menu.querySelector(
      '[data-command-type="ingredient"]'
    );
    headerButton.style.display = "";
    ingredientButton.style.display = "none";
  }
  setNodeOffset() {
    let root = this.dom.closest(".ingredients");
    let { top, height } = this.dom.getBoundingClientRect();
    let nodeY = top + height * 0.5 - root.getBoundingClientRect().top;
    root.style.setProperty("--node-y", `${nodeY}px`);

    root.dataset.nodeIndex = this.getNodeIndex();

    let start = this.getPos();
    let end = start + this.text.length;
    root.dataset.start = start;
    root.dataset.end = end;
  }
  onQuantityHover(e) {
    const { type, target, relatedTarget } = e;

    let domRect = this.dom.getBoundingClientRect();
    this.pos = [domRect.left, domRect.top];

    let translateToggle = target
      .closest("ingredient")
      .querySelector(".ingredient__quantity-translate");
    // let translateSelect = target
    //   .closest("ingredient")
    //   .querySelector(".ingredient__quantity-translate__select");
    if (translateToggle && translateToggle !== this.translateToggle) {
      this.translateToggle = translateToggle;
      // this.translateSelect = translateSelect;
      this.translateToggle.onclick = this.toggleSelect.bind(this);
      // this.translateSelect.onchange = this.translateQuantity.bind(this);
    }
    // this.translateSelect && this.setSelectOptions();

    this.node.attrs.index == null && this.setIndex();

    if (!translateToggle) return;

    let show = type === "mouseenter" || relatedTarget === this.translateToggle;
    this.translateToggle.classList[show ? "add" : "remove"]("show");
  }
  toggleSelect({ target }) {
    this.quantityFrom = target.from;
    this.quantityTo = target.to;
    // this.translateSelect.click();
  }
  translateQuantity() {
    let { state } = this.view;
    let { tr } = state;
    let destKey = this.translateSelect.value;
    let { quantity: baseQuantity, unit: unitKey } = this.node.attrs;
    let quantity = convertUnit(
      baseQuantity,
      unitKey.slice(0, 1).toUpperCase() + unitKey.slice(1),
      destKey
    );
    this.quantity = quantity;
    this.unit = destKey;

    let keys = Object.keys(ingredientUnits).sort((a, b) =>
      a.length < b.length ? 1 : -1
    );
    let regex = new RegExp(
      `(?<quantity>\\d+ to \\d+|\\d*\\s*\\d+\\/\\d+|\\d+\\.\\d+|\\d+)[-\\s]*(?<unit>${keys.join(
        "|"
      )})*[s(es)]*(?=\\s+|\\b)`,
      "i"
    );

    let matches = regex.exec(this.text);

    let start = this.getPos();
    let end = start + this.text.length;
    let plural = quantity > 1;
    let newUnit = plural
      ? pluralize(destKey.toLowerCase())
      : destKey.toLowerCase();
    this.text = this.text.replace(
      matches[0],
      `${limitFloat(quantity, 2)} ${newUnit}`
    );
    tr.insertText(this.text, start, end);
    this.view.dispatch(tr);
  }
  stopEvent() {
    return true;
  }
  update(node, decorations, innerDecorations) {
    console.log(node, this.view);
    if (node.type.name != "ingredient") return false;

    this.dom.classList[node.content.size > 0 ? "remove" : "add"]("empty");

    let content = node?.content?.content[0]?.text ?? "";
    let parsed = parseIngredient(content);
    this.quantity = parsed?.quantity ?? 0;
    this.unit = parsed?.unit ?? "";

    this.dom.dataset.quantity = this.quantity;
    this.dom.dataset.unit = this.unit;

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
      quantity: this.quantity,
      unit: this.unit,
      index: this.setIndex,
      ...attrs,
    });
    let newState = this.view.state.apply(transaction);
    this.view.updateState(newState);
  }
  setSelectOptions() {
    this.translateSelect.innerHTML = "";
    let { unit: unitKey } = this;
    let unit = ingredientUnits[unitKey];
    let { system: unitSystem, type: unitType } = unit;
    let units = unitsByType[unitType] ?? [];

    let opt;
    for (let option = 0; option < units.length; option++) {
      opt = document.createElement("option");
      opt.innerHTML = units[option].title;
      opt.value = units[option].title;
      opt.selected = opt.value.toLowerCase() === unitKey.toLowerCase();
      this.translateSelect.appendChild(opt);
    }
  }
}

export default IngredientView;
