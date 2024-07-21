import { clamp } from "lodash";
import { get } from "svelte/store";
import { settings } from "store/";
import { unitsByType } from "data/units";
import ingredientUnits from "data/units/ingredient";
import temperatureUnits from "data/units/temperature";
import sortByPreferred from "utils/units/sortByPreferred";
import { recipeNodeTypes } from "schemas/recipe";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

const usableUnits = {
  ...ingredientUnits,
  ...temperatureUnits,
};

const unitKeys = Object.keys(usableUnits).sort((a, b) =>
  a.length < b.length ? 1 : -1
);

const nodeTypes = [recipeNodeTypes.INGREDIENT, recipeNodeTypes.STEP];

class UnitSelector {
  constructor() {
    this.view = null;

    this.selectedNode = {
      start: null,
      end: null,
      text: "",
      index: -1,
    };
    this.activeQuantity = null;

    this.optionsList = null;
    this.button = null;
    this.options = [];

    this.passEvent = true;

    this.optionSelected = null;
    this.optionFocus = 0;
    this.typeOptions = [];

    this.editorType = null;
    this.editorFocus = null;

    this.optionIdPrefix = "quantity-unit__";

    this.show = false;

    this.onOptionHover = this.onOptionHover.bind(this);
    this.onClickOut = this.onClickOut.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.hasInit = false;
  }
  // init
  init(view) {
    this.hasInit = true;
    this.dom = $("#recipe__header__toolbar__unit-select");
    this.optionsList = $(this.dom, ".recipe__header__select__options");
    this.button = $(this.dom, ".recipe__header__select__button");
    this.view = view;

    window.addEventListener("click", this.onClickOut);
  }
  // Markup
  getOptionMarkup(label, abbrev, value, index) {
    let option = document.createElement("li");
    option.setAttribute("class", "recipe__header__select__option");
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.setAttribute("tabindex", "-1");
    option.setAttribute("data-value", value);
    option.setAttribute("data-index", index);
    option.id = this.optionIdPrefix + index;
    let abbrevSpan = document.createElement("span");
    abbrevSpan.textContent = abbrev;
    let labelSpan = document.createElement("span");
    labelSpan.textContent = label;
    option.appendChild(abbrevSpan);
    option.appendChild(labelSpan);
    return option;
  }
  // View State Getters
  getEditorUnit(activeQuantity) {
    let activeUnit = activeQuantity?.unit ?? null;

    return activeUnit ? usableUnits[activeUnit] : null;
  }
  getActiveQuantity(selectedNode, state) {
    let {
      selection: { from, to },
    } = state;

    if (!selectedNode) return null;

    let fragment = new RecipeFragment(selectedNode.text, selectedNode.start);

    let activeQuantity = fragment.decorations.filter(
      (d) => from >= d.pos && to <= d.end
    );

    return activeQuantity[0] ?? null;
  }
  command(event) {
    !this.hasInit && this.init();

    if (!this.options.length) return;

    // toggle
    if (event.target.closest(".recipe__header__select__button")) {
      return this.toggleOptions();
    }
    // Change current block type
    this.selectOption(+event.target.dataset.index);
  }
  selectOption(index) {
    this.optionSelected = +index ?? null;
    this.convertUnit(), this.updateDom(), this.hideOptions();
  }
  getSelectedNode(state) {
    let {
      selection: { from, to },
    } = state;

    let start = null,
      end = null,
      text = "",
      index = -1;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (!nodeTypes.includes(node.type.name)) return;
      text = node.textContent;
      index = node.attrs.index;
      start = pos;
      end = pos + node.nodeSize;
      // start = pos + 1;
      // end = start + text.length;
    });

    return { start, end, text, index };
  }
  convertUnit() {
    let { state, dispatch } = this.view;
    let toUnit = this.typeOptions[this.optionSelected];
    if (
      toUnit === this.unit ||
      !this.activeQuantity ||
      !this.selectedNode.start
    )
      return this.hideOptions();

    let { start, end, index, text } = this.selectedNode;
    let replaceStr = this.activeQuantity.text;
    let converted = this.activeQuantity.convert(toUnit);
    let newText = text.replace(replaceStr, converted.text);

    let transaction = state.tr.insertText(newText, start + 1, end - 1);
    transaction.setNodeMarkup(start, null, {
      index,
      quantity: converted.quantity,
      unit: toUnit.title,
    });

    dispatch(transaction);

    this.hideOptions();
  }
  update() {
    !this.hasInit && this.init();
    let prevUnit = this.editorUnit;
    this.selectedNode = this.getSelectedNode(this.view.state);
    this.activeQuantity = this.getActiveQuantity(
      this.selectedNode,
      this.view.state
    );
    this.editorUnit = this.getEditorUnit(this.activeQuantity);
    prevUnit !== this.editorUnit && this.updateOptions();
    this.optionSelected = this.editorUnit
      ? this.typeOptions.findIndex((t) => t.title === this.editorUnit.title)
      : null;
    this.unit = this.editorUnit ? this.typeOptions[this.optionSelected] : null;
    this.updateDom();
  }
  updateDom() {
    this.updateButton();
    this.updateCurrent();
  }
  getTypeOptions(currentUnit) {
    let preferred = get(settings).units;
    if (!currentUnit) return [];
    let typeUnits = sortByPreferred(unitsByType[currentUnit.type], preferred);

    return typeUnits;
  }
  updateOptions() {
    this.removeOptionListeners();
    this.optionFocus = 0;
    this.typeOptions = this.getTypeOptions(this.editorUnit);
    this.optionsList.innerHTML = "";
    let option,
      index = 0;
    for (let o of this.typeOptions) {
      option = this.getOptionMarkup(o.title, o.abbrev[0], o.title, index);
      this.optionsList.appendChild(option);
      index++;
    }

    this.options = $$(this.dom, ".recipe__header__select__option");
    this.addOptionListeners();
  }
  updateCurrent() {
    let index = 0;
    for (let option of this.options) {
      option.classList[index === this.optionFocus ? "add" : "remove"]("focus");
      option.setAttribute("aria-selected", index === this.optionSelected);
      index++;
    }
    this.optionsList.setAttribute(
      "aria-activedescendant",
      this.optionFocus ? this.optionIdPrefix + this.optionFocus : ""
    );
  }
  updateButton() {
    let abbrev = $(this.button, ".recipe__header__select__button__abbrev"),
      label = $(this.button, ".recipe__header__select__button__label");

    this.button.disabled = this.unit == null;

    abbrev.textContent = this.unit ? this.unit.abbrev[0] ?? " " : " ";
    label.textContent = this.unit ? this.unit.title ?? "Unit" : "Unit";
  }
  toggleFocus(up) {
    this.optionFocus += up ? -1 : 1;
    this.optionFocus = clamp(this.optionFocus, 0, this.typeOptions.length - 1);

    this.updateCurrent();
  }
  // Show + hide
  toggleOptions(show = !this.show) {
    show ? this.showOptions() : this.hideOptions();
  }
  showOptions() {
    this.show = true;
    this.button.setAttribute("aria-expanded", "true"),
      this.optionsList.setAttribute("aria-hidden", "false"),
      this.addKeyListeners();
  }
  hideOptions() {
    this.show = false;
    this.button.setAttribute("aria-expanded", "false"),
      this.optionsList.setAttribute("aria-hidden", "true"),
      this.removeKeyListeners();
  }
  // Event listeners
  addOptionListeners() {
    for (let option of this.options) {
      option.addEventListener("mouseenter", this.onOptionHover);
    }
  }
  removeOptionListeners() {
    for (let option of this.options) {
      option.removeEventListener("mouseenter", this.onOptionHover);
    }
  }
  onClickOut(e) {
    if (!this.show || e.target === this.dom || this.dom.contains(e.target))
      return;
    this.hideOptions();
  }
  onOptionHover(e) {
    this.optionFocus = +e.target.dataset.index;
    this.updateCurrent();
  }
  addKeyListeners() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }
  removeKeyListeners() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }
  onKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      window.event.preventDefault();
      this.view.dom.blur();
      this.toggleFocus(e.key === "ArrowUp");
    } else if (e.key === "Enter" || e.key === "Space" || e.key === " ") {
      e.preventDefault();
      window.event.preventDefault();
      this.selectOption(this.optionFocus);
      this.view.focus();
    } else if (e.key === "Escape") {
      return this.hideOptions();
    }
  }
  onKeyUp(e) {
    if (e.key !== "Enter" && e.key !== "Space") return;
    e.preventDefault();
    window.event.preventDefault();
  }
  destroy() {
    this.removeOptionListeners(),
      this.removeKeyListeners(),
      window.removeEventListener("click", this.onClickOut);
  }
}

const unitSelector = new UnitSelector();

export default unitSelector;
