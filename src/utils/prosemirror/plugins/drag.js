import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

export default new Plugin({
  state: {
    init(_, { doc }) {
      return dragThumbDecos(doc);
    },
    apply(transaction, old) {
      return transaction.docChanged ? dragThumbDecos(transaction.doc) : old;
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
    handleDOMEvents: {
      // pointerdown: onPointerDown,
      // pointerup: onPointerUp,
      // pointerover: onPointerOver,
      // dragstart: onDragStart,
      // dragend: onDragEnd,
      // dragover: onDragOver,
      // drop: onDrop,
      // dragleave: (view, event) => {
      //   console.log("dragleave", { event });
      //   return true;
      // },
    },
  },
});
let dragSrc,
  dragSrcIndex,
  dragText,
  dragTarget,
  dragTargetIndex,
  dragTargetSide;
function onDragStart(view, event) {
  // copy parent element text content
  let { target } = event;
  if (target.tagName !== "DRAGTHUMB") return false;
  let parent = event.target.parentElement;
  dragSrc = parent;
  dragText = parent.textContent;
  dragSrcIndex = +parent.dataset.index;
  return false;
}
function onDragOver(view, event) {
  // get position of pointer relative to entered element
  // is pointer in top or bottom half
  let target = event.target.closest("h3, ingredient, dt, dd");
  if (!target || !dragSrc) return false;
  if (target === dragSrc) {
    dragTarget = null;
    return false;
  }
  removeShadows();
  let cursorY = event.clientY;
  let targetBox = target.getBoundingClientRect();
  let targetTop = targetBox.top;
  let targetBottom = targetBox.top + targetBox.height;
  let targetMid = targetTop + (targetBottom - targetTop) * 0.5;
  dragTarget = target;
  dragTargetSide = cursorY > targetMid ? "AFTER" : "BEFORE";
  dragTargetIndex =
    +target.dataset.index + (dragTargetSide === "AFTER" ? 1 : -1);
  if (dragTargetIndex === dragSrcIndex) {
    (dragTarget = null), (dragTargetSide = null), (dragTargetIndex = null);
    return false;
  }

  // get half way point between

  target.style.boxShadow = `0px ${
    dragTargetSide === "AFTER" ? 2 : -2
  }px 0px 0px #f5853f`;

  return true;
}
function removeShadows() {
  $$(dragSrc.parentElement, "h3, ingredient, dt, dd")
    .forEach((el) => el.style.removeProperty("box-shadow"));
}
function onDragEnd(view, event) {
  let { state } = view.state;
  // rearrage document according to drop position
  removeShadows();
  console.log("dragend", { target: dragTarget, side: dragTargetSide });
  (dragSrc = ""),
    (dragText = ""),
    (dragIndex = ""),
    (dragTarget = ""),
    (dragTargetSide = "");
  return true;
}
function onDrop(view, event) {
  // rearrage document according to drop position
  console.log("drop", { event });
  return true;
}

function listen(tr) {
  console.log({ tr });
}

function onClickOut(e) {
  if (
    e.target.closest("#ingredients__translateunit") ||
    e.target.closest(".unit")
  )
    return;
  $("#ingredients__translateunit").classList.remove("show");
  window.removeEventListener("click", onClickOut);
  currentIndex = null;
}

function dragThumbDecos(doc) {
  let decos = [];

  let widget;
  prependDragThumb(doc).forEach((block) => {
    widget = document.createElement("dragthumb");
    // widget.draggable = true;
    widget.innerHTML =
      '<svg width="16" height="24" viewBox="0 0 16 24" role="presentation"><path d="m2.5 19c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-7-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-7-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm-7-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm7 0c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z" /></svg>';
    decos.push(
      Decoration.widget(block.start, widget, {
        class: "dragthumb",
      })
    );
  });

  return DecorationSet.create(doc, decos);
}

function prependDragThumb(doc) {
  let result = [];

  function record(start) {
    result.push({ start });
  }

  // For each node in the document

  doc.descendants((node, pos) => {
    if (node.type.name !== "text") return;

    record(
      pos // start of quantity
    );
  });

  return result;
}
