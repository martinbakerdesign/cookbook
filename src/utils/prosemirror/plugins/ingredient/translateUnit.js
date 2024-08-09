import { Plugin } from "prosemirror-state";

import schema from "schemas/ingredient";
import ingredientUnits from "data/units/ingredient";
import { unitsByType } from "data/units";
import convertUnit from "utils/units/convert";
import pluralize from "pluralize";
import limitFloat from "utils/math/limitFloat";
import $ from "utils/dom/querySelector";

const unitKeys = Object.keys(ingredientUnits).sort((a, b) =>
  a.length < b.length ? 1 : -1
);
const regex = new RegExp(
  `(?<quantity>\\d+ to \\d+|\\d*\\s*\\d+\\/\\d+|\\d+\\.\\d+|\\d+)[-\\s]*(?<unit>${unitKeys.join(
    "|"
  )})*[s(es)]*(?=\\s+|\\b)`,
  "i"
);

class TranslateUnitView {
  constructor(items, editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.createElement("div");
    this.dom.id = "ingredients__translateunit";
    this.dom.className = "context context--ingredient";

    this.init();
  }
  init() {
    this.appendItems();
    this.listen();
  }
  appendItems() {
    this.items.forEach(({ dom }) => this.dom.appendChild(dom));
  }
  listen() {
    this.editorView.dom.parentElement.addEventListener(
      "click",
      this.onEditorClick.bind(this)
    );
  }
  onEditorClick(e) {
    this.editorView.focus();

    let option = e.target.closest(".ingredients__translateunit__option");

    for (let { command, dom, name } of this.items) {
      if (name !== "Translate Quantity") continue;
      command(
        this.editorView.state,
        this.editorView.dispatch,
        option?.dataset?.value
      );
    }
  }
  destroy() {
    this.editorView.dom.removeEventListener("click", this.onEditorClick);
    this.dom.remove();
  }
}

// plugins
function _translateUnit(nodeType, attrs) {
  return function (state, dispatch, value = null) {
    let applicable = false;
    let { from, to } = state.selection;
    let start, end, content;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.isTextblock) {
        applicable = node.type.name === nodeType.name;
      } else if (applicable) {
        content = node.textContent;
        start = state.doc.resolve(pos).pos;
        end = start + content.length;
      }
    });
    let matches = regex.exec(content);
    let quantity = matches?.groups?.quantity ?? null;
    let fromUnit = matches?.groups?.unit?.toLowerCase() ?? null;

    if (!applicable || quantity == null || !fromUnit) return false;

    fromUnit &&
      ingredientUnits[fromUnit] &&
      updateTranslationOptions(ingredientUnits[fromUnit]);

    dispatch &&
      value &&
      translateIngredient(
        state,
        matches,
        value,
        quantity,
        fromUnit,
        content,
        [start, end],
        dispatch
      );
    return true;
  };
}

// Helper function to create menu icons
function translateOptions() {
  let container = document.createElement("ul");
  container.className = "tool tool--translate";
  container.id = "ingredients__translateunit__list";
  container.setAttribute("role", "listbox");
  return container;
}

// Helper functions
function updateTranslationOptions(unit) {
  const list = $("#ingredients__translateunit__list");

  list.innerHTML = "";
  let units = unitsByType[unit.type];
  let option, selected;
  let index = 0;
  for (let u of units) {
    option = document.createElement("li");
    option.innerHTML = u.title;
    option.className = "ingredients__translateunit__option";
    selected = u.title === unit.title;
    option.setAttribute("role", "option");
    option.setAttribute("data-value", u.title);
    option.setAttribute("data-selected", selected.toString());
    option.tabIndex = index + 1;
    selected &&
      (option.innerHTML +=
        '<svg class="icon" viewBox="0 0 16 16" width="16" height="16"><path d="m12 4 1 1-7 7.5-3.5-3 1-1 2.5 2z" /></svg>');
    list.appendChild(option);
    index++;
  }
  // if (select.dataset.unitType !== unit.title) {
  // } else {
  //   select.value = unit.title;
  // }
  list.dataset.unitType = unit.title;
}
function hideTranslate() {
  $("#ingredients__translateunit").classList.remove("show");
}
function translateIngredient(
  state,
  matches,
  value,
  quantity,
  fromUnit,
  content,
  [start, end],
  dispatch
) {
  let matchStr = matches[0];
  let toUnit = value;
  let text = content;

  hideTranslate();

  if (fromUnit === toUnit) return;
  let convertedValue = +convertUnit(quantity, fromUnit, toUnit);

  text = content.replace(
    matchStr,
    `${+limitFloat(convertedValue, 2, 24)} ${
      convertedValue > 1
        ? pluralize(toUnit).toLowerCase()
        : toUnit.toLowerCase()
    }`
  );
  dispatch(state.tr.insertText(text, start, end).scrollIntoView());
}

function translateUnitPlugin(items) {
  return new Plugin({
    view(editorView) {
      let contextMenu = new TranslateUnitView(items, editorView);
      editorView.dom.parentNode.insertBefore(contextMenu.dom, editorView.dom);
      return contextMenu;
    },
  });
}

function translateUnit() {
  return translateUnitPlugin([
    {
      command: _translateUnit(schema.nodes.ingredient),
      dom: translateOptions(),
      name: "Translate Quantity",
    },
  ]);
}

export default translateUnit;
