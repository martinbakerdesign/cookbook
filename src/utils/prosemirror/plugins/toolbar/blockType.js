import recipeSchema, { recipeNodeTypes } from "schemas/recipe";
import { clamp } from "lodash";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

const blockTypes = {
  ingredients: [
    {
      type: recipeNodeTypes.HEADER,
      name: "Header",
    },
    {
      type: recipeNodeTypes.INGREDIENT,
      name: "Ingredient",
    },
  ],
  method: [
    {
      type: recipeNodeTypes.HEADER,
      name: "Header",
    },
    {
      type: recipeNodeTypes.STEP,
      name: "Method",
    },
  ],
};

class BlockTypeSelector {
  constructor() {
    this.view = null;

    this.optionsList = null;
    this.button = null;
    this.options = [];

    this.passEvent = true;

    this.optionSelected = null;
    this.optionFocus = 0;
    this.typeOptions = [];

    this.editorType = null;
    this.editorFocus = null;

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
    this.dom = $("#recipe__header__toolbar__block-type");
    this.optionsList = $(
      this.dom,
      ".recipe__header__select__options",
    );
    this.button = $(this.dom, ".recipe__header__select__button");
    this.view = view;

    this.optionIdPrefix = "block-type__";

    window.addEventListener("click", this.onClickOut);
  }
  // View State Getters
  getEditorFocus(state) {
    let {
      selection: { empty, from, to },
    } = state;
    let methodStart = 0;

    state.doc.descendants(
      (n, pos) => n.type.name === recipeNodeTypes.METHOD && (methodStart = pos)
    );

    let editorFocus = empty
      ? from < methodStart
        ? "ingredients"
        : "method"
      : to < methodStart
      ? "ingredients"
      : "method";

    return editorFocus;
  }
  getEditorType(state) {
    let {
      selection: { empty, from, to },
    } = state;

    let current, start, end;
    state.doc.descendants((node, pos) => {
      if (!Object.keys(recipeNodeTypes).includes(node.type.name)) return;
      start = pos;
      end = start + node.content.size + 1;
      from >= start && to <= end && (current = node);
    });

    return current ? current.type.name : null;
  }
  // Markup
  getOptionMarkup(label, value, index) {
    let option = document.createElement("li");
    option.setAttribute("class", "recipe__header__select__option");
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.setAttribute("tabindex", "-1");
    option.setAttribute("data-value", value);
    option.setAttribute("data-index", index);
    option.id = this.optionIdPrefix + index;
    option.textContent = label;
    return option;
  }
  command(event, state, dispatch) {
    !this.hasInit && this.init();
    // toggle
    if (event.target.closest(".recipe__header__select__button")) {
      return this.toggleOptions();
    }
    // Change current block type
    this.changeBlockType(event.target.dataset.value, state, dispatch);
  }
  changeBlockType(
    type,
    state = this.view.state,
    dispatch = this.view.dispatch
  ) {
    if (type === this.editorType) return this.hideOptions();
    let { from, to } = state.selection;
    let newType = recipeSchema.nodes[type];
    let transaction = state.tr.setBlockType(from, to, newType).scrollIntoView();

    dispatch(transaction);
    this.hideOptions();
  }
  update() {
    !this.hasInit && this.init();
    let prevFocus = this.editorFocus;
    this.editorFocus = this.getEditorFocus(this.view.state);
    this.editorType = this.getEditorType(this.view.state);
    prevFocus !== this.editorFocus && this.updateOptions();
    this.optionSelected = this.editorType
      ? this.typeOptions.findIndex((t) => t.type === this.editorType)
      : null;
    this.updateDom();
  }
  updateDom() {
    this.updateButton();
    this.updateCurrent();
  }
  updateOptions() {
    this.removeOptionListeners();
    this.optionFocus = 0;
    this.typeOptions = blockTypes[this.editorFocus];
    this.optionsList.innerHTML = "";
    let option,
      index = 0;
    for (let o of this.typeOptions) {
      option = this.getOptionMarkup(o.name, o.type, index);
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
    let label = $(
      this.button,
      ".recipe__header__select__button__label",
    );
    this.button.disabled = this.editorType == null;

    label.textContent = this.editorType
      ? this.typeOptions.filter((t) => t.type === this.editorType)[0]?.name ??
        ""
      : "";
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
    if (e.target === this.dom || this.dom.contains(e.target)) return;
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
      this.changeBlockType(this.typeOptions[this.optionFocus].type);
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

const blockTypeSelector = new BlockTypeSelector();

export default blockTypeSelector;
