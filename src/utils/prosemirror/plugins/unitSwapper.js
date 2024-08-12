import { clamp } from "lodash";
import { get } from "svelte/store";
import { unitsByType } from "data/units";
import { settings } from "store/";
import sortByPreferred from "utils/units/sortByPreferred";
import { NODES } from "schemas/recipe";
import RecipeFragment from "utils/recipes/fragment/RecipeFragment";
import ingredientUnits from "data/units/ingredient";
import temperatureUnits from "data/units/temperature";
import { Plugin } from "prosemirror-state";
import isTouch from "store/isTouch";
import { connectFirestoreEmulator } from "firebase/firestore";
import { navHeight } from "store/index";

const swappableUnits = {
  ...ingredientUnits,
  ...temperatureUnits,
};

const nodeTypes = [NODES.INGREDIENT, NODES.STEP];

class UnitSwapTooltip {
  constructor() {
    this.view = null;

    this.tooltip = null;

    this.offsetTop = 4;
    
    this.unit = null;
    this.from = 0;
    this.to = 0;
    this.selectedNode = null;
    this.activeQuantity = null;

    this.open = false;

    this.resizeObserver = null;
  }
  setView = (view) => {
    this.view = view;

    if (!view) return;

    this.tooltip = this.getTooltip();
    this.appendTooltip();

    this.resizeObserver = new ResizeObserver(this.onTooltipResize);
    this.tooltip && this.resizeObserver.observe(this.tooltip);

    this.update(this.view, null);
  };
  destroy = () => {
    this.resizeObserver.disconnect();
    this.resizeObserver = null;
  }
  appendTooltip = () => {
    this.view?.dom.parentNode.appendChild(this.tooltip);
  };
  update = (view, lastState) => {
    if (this.view) return;
    this.setView(view);
  };
  clear = () => {
    this.tooltip.innerHTML = "";
  };
  populate = (options, currentIndex) => {
    this.clear();
    for (let index = 0; index < options.length; index++) {
      const isCurrent = index === currentIndex;
      const option = options[index];
      const optionElement = this.createOption(option, index, isCurrent);
      this.tooltip.appendChild(optionElement);
    }
  };
  createOption = (option, index, isCurrent) => {
    const $isTouch = get(isTouch);
    const optionElement = document.createElement("button");
    optionElement.className =
      "rounded-1 bg-background-fill-inverted hover:bg-background-fill-inverted-hover text-body-md px-6 grid grid-cols-[2.5rem_1fr] gap-x-2 text-left flex items-center" +
      ($isTouch ? " py-2" : "");
    optionElement.dataset.index = index;
    optionElement.dataset.unit = option.title;
    optionElement.innerHTML = `<span class="font-bold text-accent inline-block w-full text-body-xs">${option.abbrev[0]}</span><span class="text-text inline-block w-full">${option.title}</span>`;

    optionElement.addEventListener("click", this.handleOptionClick);

    return optionElement;
  };
  onTooltipResize = () => {
    if (!this.open) return;
    this.setTooltipPos();
  }
  getNodePos = () => {
    const start = this.view.coordsAtPos(this.from),
      end = this.view.coordsAtPos(this.to);

    const top = start.top;
    const startX = start.left,
      endX = end.left;
    const midX = startX + (endX - startX) * 0.5;

    return [midX, top];
  }
  setTooltipPos = () => {
    const [midX, top] = this.getNodePos();
    const tooltipPos = this.getTooltipPos(midX, top);
    this.tooltip.style.left = `${tooltipPos.left}px`;
    this.tooltip.style.top = `${tooltipPos.top}px`;
  }
  getTooltipPos = (nodeMidX, nodeY) => {
    const {width, height} = this.tooltip.getBoundingClientRect();
    const pagePad = getComputedStyle(document.body).getPropertyValue(
      "--padding-page"
    );
    const pagePadPx =
      parseFloat(pagePad.replace(/[^\d^\.]/g, "")) *
      (pagePad.includes("px") ? 1 : pagePad.includes("rem") ? 16 : 1);

    const left = Math.max(nodeMidX - width * 0.5, pagePadPx);

    const minY = get(navHeight) + this.offsetTop;
    const tooltipTop = nodeY - this.offsetTop - height;

    const side = tooltipTop < minY ? 1 : -1;
    
    const top = ((side === -1 ? (tooltipTop + height) : (nodeY + 17 + this.offsetTop + height)) + window.scrollY);

    return {
      left,
      top,
    };
  };
  getTooltip = () => {
    const tooltip = document.createElement("div");
    tooltip.className =
      "absolute rounded-2 bg-background shadow-lg p-2 z-10 -translate-y-full flex-col gap-y-1 aria-[hidden=false]:flex none";
    tooltip.hidden = true;
    tooltip.setAttribute("aria-hidden", "true");

    return tooltip;
  };
  convertSelectionToUnit = (newUnitTitle) => {
    if (!this.view) return;

    const { state, dispatch } = this.view;
    if (newUnitTitle === this.unit?.title || !this.unit?.title) return;

    const newUnit = swappableUnits[newUnitTitle];

    if (!newUnit) return;

    const { start, end, index, text } = this.selectedNode;
    const replaceStr = this.activeQuantity.text;
    const converted = this.activeQuantity.convert(newUnit);
    const newText = text.replace(replaceStr, converted.text);

    const transaction = state.tr.insertText(newText, start + 1, end - 1);
    transaction.setNodeMarkup(start, null, {
      index,
      quantity: converted.quantity,
      unit: newUnit,
    });

    dispatch(transaction);
  };
  hideTooltip = () => {
    const $isTouch = get(isTouch);

    this.open = false;

    this.tooltip.hidden = true;
    this.tooltip.setAttribute("aria-hidden", "true");

    window.removeEventListener("click", this.onClickOut);
    window.removeEventListener("keydown", this.onEsc);

    if (!$isTouch) return;

    document.documentElement.style.overflowY = "scroll";
  };
  handleToggleClick = (e) => {
    if (!this.view) return;

    const $isTouch = get(isTouch);

    const target = e.target.closest("button");
    this.from = +target.dataset.from;
    this.to = +target.dataset.to;

    const unit = swappableUnits[target.dataset.unit];
    if (!unit) {
      this.unit = unit;
      return;
    }

    const unitType = unit?.type ?? null;

    if (!unitType) {
      this.unit = null;
      return;
    }

    this.selectedNode = getSelectedNode(this.from, this.to, this.view.state);
    this.activeQuantity = getActiveQuantity(this.selectedNode, this.from, this.to, this.view.state);
    this.open = true;

    // get unit options
    const options = getOptionsByType(unitType);
    const currentIndex = options.findIndex(isOptionCurrent(unit));

    // populate tooltip
    // tooltip position will be calculated and applied
    // after the tooltip changes are rendered in the
    // dom and the resizeobserver is triggered
    if (unit?.title !== this.unit?.title) {
      this.populate(options, currentIndex);
    }

    this.setTooltipPos();

    if ($isTouch) {
      // disable scroll
      document.documentElement.style.overflowY = "hidden";
    }

    // show tooltip
    this.tooltip.hidden = false;
    this.tooltip.setAttribute("aria-hidden", "false");

    // set clickout listener
    this.clickoutSet = false;
    window.addEventListener("click", this.onClickOut);
    window.addEventListener("keydown", this.onEsc);

    this.unit = unit;
  };
  handleOptionClick = (e) => {
    const target = e.target.closest('button');
    const unit = target.dataset.unit;

    this.convertSelectionToUnit(unit)

    this.hideTooltip();
  };
  onClickOut = (e) => {
    const target = e.target;
    if (!this.clickoutSet) {
      this.clickoutSet = true;
      return;
    }
    if (this.tooltip.contains(target)) return;

    this.hideTooltip();

    e.preventDefault();
    e.stopPropagation();
  };
  onEsc = (e) => {
    if ("Escape" !== e?.key) return;
    this.hideTooltip();
  };
}

function getSelectedNode(from, to, state) {
  if (!state) return null;

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
  });

  return { start, end, text, index };
}
function getActiveQuantity(currentNode, from, to, state) {
  if (!currentNode) return null;

  const fragment = new RecipeFragment(currentNode.text, currentNode.start);

  const activeQuantity = fragment.decorations.filter(
    (d) => from >= d.pos && to <= d.end
  );

  return activeQuantity[0] ?? null;
}
function getOptionsByType(unitType) {
  const $settings = get(settings)?.units ?? {}
  const preferredSystem = $settings[unitType] ?? null;
  return sortByPreferred(unitsByType[unitType] ?? [], preferredSystem);
}

const unitSwapTooltip = new UnitSwapTooltip();

const plugin = new Plugin({
  view(editorView) {
    unitSwapTooltip.setView(editorView);
    return unitSwapTooltip;
  },
});

function isOptionCurrent(unit) {
  return (option) =>
    option.title === unit.title && option.system === unit.system;
}

export { plugin as default, unitSwapTooltip };