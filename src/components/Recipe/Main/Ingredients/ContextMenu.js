import { Plugin } from "prosemirror-state";

import { toggleMark, wrapIn } from "prosemirror-commands";
import schema from "./schema";
import iconDefs from "components/Icon/iconDefs";
import { ingredientUnits, unitsByType } from "utils/units";
import convertUnit from "utils/units/convert";
import pluralize from "pluralize";

const svgns = "http://www.w3.org/2000/svg";

const unitKeys = Object.keys(ingredientUnits).sort((a, b) =>
  a.length < b.length ? 1 : -1
);
const regex = new RegExp(
  `(?<quantity>\\d+ to \\d+|\\d*\\s*\\d+\\/\\d+|\\d+\\.\\d+|\\d+)[-\\s]*(?<unit>${unitKeys.join(
    "|"
  )})*[s(es)]*(?=\\s+|\\b)`,
  "i"
);

class ContextMenuView {
  constructor(items, editorView) {
    this.items = items;
    this.editorView = editorView;

    this.dom = document.createElement("div");
    this.dom.id = "ingredients__contextmenu";
    this.dom.className = "contextmenu";

    this.init();
  }
  init() {
    this.appendItems();
    this.update();
    this.listen();
  }
  appendItems() {
    this.items.forEach(({ dom }) => this.dom.appendChild(dom));
  }
  listen() {
    this.dom.addEventListener("mousedown", (e) => {
      if (e.target === document.querySelector("#ingredients__translate")) {
        this.editorView.focus();
        return;
      }
      e.preventDefault();
      this.editorView.focus();
      for (let { command, dom, name } of this.items) {
        name !== "Translate Quantity" &&
          dom.contains(e.target) &&
          command(
            this.editorView.state,
            this.editorView.dispatch,
            this.editorView
          );
      }
    });
    this.dom
      .querySelector("#ingredients__translate")
      .addEventListener("change", this.translate.bind(this));
  }
  translate(e) {
    this.editorView.focus();

    for (let { command, dom, name } of this.items) {
      if (name === "Translate Quantity") {
        command(
          this.editorView.state,
          this.editorView.dispatch,
          e.target.value
        );
      }
    }
  }
  update() {
    let active;
    for (let { dom, command, name } of this.items) {
      active = command(this.editorView.state, null);
      dom.style.display = active ? "" : "none";
    }
  }
  destroy() {
    this.dom.remove();
  }
}

function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      let contextMenu = new ContextMenuView(items, editorView);
      editorView.dom.parentNode.insertBefore(contextMenu.dom, editorView.dom);
      return contextMenu;
    },
  });
}

// plugins
function _setBlockType(nodeType, attrs) {
  return function (state, dispatch) {
    let applicable = getIsApplicable(nodeType, state);

    if (!applicable) {
      return false;
    }

    let { from, to } = state.selection;
    dispatch &&
      dispatch(
        state.tr.setBlockType(from, to, nodeType, attrs).scrollIntoView()
      );
    return true;
  };
}
function _translateUnit(nodeType, attrs) {
  return function (state, dispatch, value) {
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
    if (!applicable || quantity == null || !fromUnit) {
      return false;
    }
    fromUnit &&
      ingredientUnits[fromUnit] &&
      updateSelect(ingredientUnits[fromUnit]);
    if (dispatch && value) {
      let matchStr = matches[0];
      let toUnit = value;

      let converted = convertUnit(quantity, fromUnit, toUnit);

      let text = content.replace(
        matchStr,
        `${converted} ${
          converted > 1 ? pluralize(toUnit).toLowerCase() : toUnit.toLowerCase()
        }`
      );
      dispatch(state.tr.insertText(text, start, end).scrollIntoView());
    }
    return true;
  };
}

// Helper function to create menu icons
function icon(type, label) {
  let icon = document.createElementNS(svgns, "svg");
  icon.setAttribute("xmlns", svgns);
  icon.setAttribute("class", `icon tool tool--${type}`);
  icon.setAttributeNS(svgns, "version", "1.1");
  icon.setAttributeNS(svgns, "viewBox", "0 0 24 24");
  icon.setAttributeNS(svgns, "width", "24");
  icon.setAttributeNS(svgns, "height", "24");
  icon.ariaLabel = label;
  icon.dataset.commandType = type;

  iconDefs[`${type}--24`].forEach((d) => {
    let el = document.createElementNS(svgns, "path");
    el.setAttributeNS(null, "d", d);
    icon.appendChild(el);
  });

  return icon;
}
function translate(type, label) {
  let container = document.createElement("div");
  container.className = "tool tool--translate";
  container.appendChild(icon(type, label));
  let select = document.createElement("select");
  select.id = "ingredients__translate";
  container.appendChild(select);
  return container;
}

// Helper functions
function updateSelect(unit) {
  const select = document.querySelector("#ingredients__translate");
  if (select.dataset.unitType !== unit.title) {
    select.innerHTML = "";
    let units = unitsByType[unit.type];
    let option;
    for (let u of units) {
      option = document.createElement("option");
      option.value = u.title;
      option.innerHTML = u.title;
      option.selected = u.title === unit.title;
      select.appendChild(option);
    }
  } else {
    select.value = unit.title;
  }
  select.dataset.unitType = unit.title;
}
function getIsApplicable(nodeType, state) {
  let { from, to } = state.selection;
  let applicable = false;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (applicable) return false;
    if (!node.isTextblock || node.type.name === nodeType.name) {
      return true;
    }
    if (node.type == nodeType) {
      applicable = true;
    } else {
      let $pos = state.doc.resolve(pos),
        index = $pos.index();
      applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
    }
  });

  return applicable;
}

const menu = menuPlugin([
  {
    command: _setBlockType(schema.nodes.header),
    dom: icon("header", "Header"),
    name: "Header",
  },
  {
    command: _setBlockType(schema.nodes.ingredient),
    dom: icon("ingredient", "Ingredient"),
    name: "Ingredient",
  },
  {
    command: _translateUnit(schema.nodes.ingredient),
    dom: translate("translate", "Translate Quantity"),
    name: "Translate Quantity",
  },
]);

export default menu;
