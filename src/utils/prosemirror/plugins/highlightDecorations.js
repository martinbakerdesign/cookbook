import { UNIT_TIME } from "data/units/_types";
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { NODES } from "schemas/recipe";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";
import quantity from "utils/text/expressions/quantity";
import units from "utils/text/expressions/units";
import $ from 'utils/dom/querySelector'
import $$ from 'utils/dom/querySelectorAll'
import { get } from "svelte/store";
import { canEdit } from "store/recipe";
import { h, min, s } from "data/units/time";
import timer, { replaceTimer } from "store/timer";
import { setDuration } from "components/Nav/Recipe/Timer";

let currentIndex;

const getTimerClickHandler = (timerDuration) => {
  return (e) => {
    replaceTimer(timerDuration)
  }
}

function getDurationFromQuantity (q) {
  const {unit,quantity} = q;

  const isHrs = [h.title, ...h.abbrev, h.plural].map(str => str.toLowerCase()).includes(unit.toLowerCase())
  const isMins = [min.title, ...min.abbrev, min.plural].map(str => str.toLowerCase()).includes(unit.toLowerCase())
  const isSecs = [s.title, ...s.abbrev, s.plural].map(str => str.toLowerCase()).includes(unit.toLowerCase())

  const value = quantity.type !== 'RANGE'
    ? quantity.value
    : quantity.value[1]

  console.log(quantity)

  if (isHrs) {
    return value * 60 * 60 * 1000;
  }
  if (isMins) {
    return value * 60 * 1000;
  }
  if (isSecs) {
    return value * 1000;
  }

  return value;
}

function createTimerButton(clickHandler) {
  let timerButton = document.createElement('button')
  timerButton.className = 'timer-button relative z-10'
  timerButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="fill-icon" viewBox="0 0 12 12"><use href="#icon--timer--12" /></svg>`
  timerButton.addEventListener('click', clickHandler)
  return timerButton
}

function getQuantityDecos(transaction, doc) {
  let decos = [];

  const from = transaction?.selection?.from ?? 0;
  const to = transaction?.selection?.to ?? 0;

  const quantities = highlightQuantities(doc);
  // const units = highlightUnits(doc);

  for (const quantity of quantities) {
    const selectionWithinDecoration = from >= quantity.pos && to <= quantity.end;

    if (quantity.unitType === UNIT_TIME && !get(canEdit)) {
      const duration = getDurationFromQuantity(quantity)
      const clickHandler = getTimerClickHandler(duration)
      const button = createTimerButton(clickHandler)
      decos.push(
        Decoration.widget(
          quantity.pos,
          button,
          {
            side: -1,
            destroy: () => {
              button.removeEventListener('click', clickHandler)
            }
          }
        )
      );
    }

    decos.push(
      Decoration.inline(
        quantity.pos,
        quantity.end,
        {
          class: getDecoClass(quantity),
          'data-unit': quantity.unitType
        }
      )
    );
  }
  // for (const unit of units) {
  //   decos.push(Decoration.inline(unit.from, unit.to, { class: "unit" }))
  // }

  return DecorationSet.create(doc, decos);
}

function getDecoClass(deco) {
  return "quantity";
}

function quantityDeco(doc) {
  let decos = [];

  highlightQuantity(doc).forEach((quantity) => {
    decos.push(
      Decoration.inline(quantity.from, quantity.to, { class: "quantity" })
    );
  });
  highlightUnit(doc).forEach((unit) => {
    decos.push(Decoration.inline(unit.from, unit.to, { class: "unit" }));
  });

  return DecorationSet.create(doc, decos);
}

const highlightableNodes = [NODES.INGREDIENT, NODES.STEP];

function highlightQuantities(doc) {
  let decos = [];

  // For each node in the document
  let isHighlightable = false;

  const getQuantities = (node, pos) => {
    // determine what can and cannot be highlighted
    highlightableNodes.includes(node.type.name) && (isHighlightable = true);
    node.type.name === NODES.HEADER && (isHighlightable = false);

    // return if item cannot be highlighted or is not a text node
    if (!isHighlightable || node.type.name !== "text") return;

    // make recipe framgent from text content
    const fragment = new RecipeFragment(node.text, pos);

    // add decorations
    for (const deco of fragment.decorations) {
      decos.push(deco);
    }
  }

  doc.descendants(getQuantities);

  return decos;
}

function highlightUnits(doc) {
  let isHighlightable = false;
  let matchStr, matchIndex, start, end;

  const result = [];

  const record = (from, to, match) => {
    result.push({ from, to, match });
  }

  const findUnitStrings = (node, pos) => {
    (node.type.name === NODES.INGREDIENT ||
      node.type.name === NODES.STEP) &&
      (isHighlightable = true);
    node.type.name === NODES.HEADER && (isHighlightable = false);

    if (!isHighlightable || node.type.name !== "text") return;
    // Scan text nodes for quantity
    const matches = new RegExp(
      `(?<outer>(?:${quantity}[ -\\s]?)${units})[ \\s\\b]`,
      ""
    ).exec(node.text);

    if (!matches?.groups?.unit) return;
    matchStr = matches.groups.unit;
    matchIndex = matches.input.indexOf(matchStr);
    start = pos + matchIndex;
    end = start + matches.groups.unit.length;

    record(
      start, // start of unit
      end, // end of input str
      matchStr
    );
  }

  doc.descendants(findUnitStrings);

  return result;
}

const highlightDecorationsPlugin = new Plugin({
  state: {
    // editor init
    init(_, { doc }) {
      const decorators = getQuantityDecos(null,doc);
      return decorators;
    },
    // click, keypress, paste, etc
    apply(transaction, old) {
      const decorators = getQuantityDecos(transaction, transaction.doc);
      return decorators;
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    },
    // handleClickOn(view, pos, node, nodePos, event) {
    //   let { target } = event;
    //   let container = view.dom;
    //   let tool = document.querySelector("#ingredients__translateunit");
    //   let targetIsUnit = target.className?.includes("unit") ?? false;
    //   let index = targetIsUnit
    //     ? target.closest(".recipe__editor__item").dataset.index
    //     : null;
    //   let toggle =
    //     targetIsUnit &&
    //     index === currentIndex &&
    //     tool.className.includes("show");
    //   currentIndex = index;

    //   tool.classList.remove("show");
    //   if (!targetIsUnit || toggle) return;
    //   // get & set position of clicked unit node
    //   let containerBox = container.getBoundingClientRect();
    //   let unitBox = target.getBoundingClientRect();
    //   let coords = [
    //     Math.round(unitBox.left + unitBox.width * 0.5 - containerBox.left),
    //     Math.round(unitBox.top + unitBox.height - containerBox.top),
    //   ];
    //   tool.style.left = `${coords[0]}px`;
    //   tool.style.top = `${coords[1]}px`;
    //   tool.classList.add("show");

    //   window.addEventListener("click", onClickOut);

    //   return true;
    // },
  },
});

export default highlightDecorationsPlugin;
