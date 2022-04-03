import { Plugin } from "prosemirror-state";
import iconDefs from "components/Icon/iconDefs";

export function getHeaderTogglePlugin(items, View) {
  return new Plugin({
    view(editorView) {
      let contextMenu = new View(items, editorView);
      editorView.dom.parentNode.insertBefore(contextMenu.dom, editorView.dom);
      return contextMenu;
    },
  });
}

const svgns = "http://www.w3.org/2000/svg";

export function getContextItemButton(type, label, id, className) {
  let el = document.createElement("button");
  el.type = "button";
  id && (el.id = id),
    className && (el.className = className),
    type && (el.dataset.type = type);
  let icon = domIcon(type, label);
  el.appendChild(icon);
  el.tabIndex = 0;

  return el;
}

function domIcon(type, label) {
  let icon = document.createElementNS(svgns, "svg");
  icon.setAttribute("xmlns", svgns);
  icon.setAttribute("class", `icon context__icon context__icon--${type}`);
  icon.setAttributeNS(svgns, "viewBox", "0 0 16 16");
  icon.setAttributeNS(svgns, "version", "1.1");
  icon.setAttributeNS(svgns, "width", "16");
  icon.setAttributeNS(svgns, "height", "16");
  icon.ariaLabel = label;
  icon.dataset.commandType = type;
  // icon.tabIndex = 0;

  iconDefs[`${type}--16`].forEach((d) => {
    let el = document.createElementNS(svgns, "path");
    el.setAttributeNS(null, "d", d);
    icon.appendChild(el);
  });

  return icon;
}

export function getIsActive(state) {
  let { from, to } = state.selection;
  let active = false;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (active) return false;
    if (!node.isTextblock) return;
    active = node.type.name === "header";
  });

  return active;
}

export function getButton(id, className, type) {
  let el = document.createElement("button");
  el.type = "button";
  el.id = "ingredients__toggleheader";
  el.className = "ingredient__context";
  el.id = id;
  el.className = className;
  el.dataset.type = type;

  return el;
}

export function toggleBlockType(nodeTypes) {
  return function (state, dispatch = null) {
    let isActive = getIsActive(state);

    if (dispatch) {
      let { from, to } = state.selection;
      let type = nodeTypes[isActive ? 0 : 1];
      let transaction = state.tr.setBlockType(from, to, type).scrollIntoView();

      dispatch(transaction);
    }
    return isActive;
  };
}

export function getOffset(view) {
  // let { selection } = view.state.tr;
  // let editorTop = view.dom.getBoundingClientRect().top ?? 0;
  let editorHeader = view.dom
    .closest(".recipe__editor")
    .parentElement.querySelector(".header h2.header__heading");
  let headerBox = editorHeader.getBoundingClientRect();
  let { left, top, height } = headerBox;

  console.log({ left, top, height, editorHeader });

  return [left, top + height * 0.5];

  // if (
  //   selection.$anchor.parent.attrs.index !== selection.$head.parent.attrs.index
  // )
  //   return;
  // let node = view.dom?.querySelector(
  //   `[data-index="${selection.$head.parent.attrs.index}"]`
  // );
  // let nodeRect = node?.getBoundingClientRect() ?? { top: 0, height: 0 };
  // let nodeHeight = nodeRect.height;
  // let topPad = node
  //   ? styleToInt(
  //       window.getComputedStyle(node, null)?.getPropertyValue("padding-top") ??
  //         0
  //     )
  //   : 0;
  // let bottomPad = node
  //   ? styleToInt(
  //       window
  //         .getComputedStyle(node, null)
  //         ?.getPropertyValue("padding-bottom") ?? 0
  //     )
  //   : 0;
  // let padding = topPad + bottomPad;
  // let nodeTop = nodeRect.top - editorTop + topPad;

  // return Math.max(nodeTop + (nodeHeight - padding) * 0.5, 8);
}
