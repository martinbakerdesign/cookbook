import { derived, get, writable } from "svelte/store";
import {
  MODES,
  mode
} from 'store/recipe'

import RecipeNav from "./Nav--Recipe.svelte";

import RecipesButton from "./RecipesButton";
import ModeToggleSwitch from "./ModeToggleSwitch";
import SectionJumper from "./SectionJumper";
import Scaler from "./Scaler";
import Timer from "./Timer";
import { scaleFactor } from "store/index";

const WIDGETS = {
  TIMER: "TIMER",
  SCALER: "SCALER",
} as const;

type Mode = ObjectValues<typeof MODES>;
type Widget = ObjectValues<typeof WIDGETS> | null;

const focusedWidget = writable<Widget>(null);
const isExpanded = writable(false);
const expandedBreakpoint = 1024;
const resizeObserver = new ResizeObserver(onResize);

// SCALER
const showScalerToggle = derived(
  [isExpanded, focusedWidget],
  ([$isExpanded, $focusedWidget]) => {
      return !$isExpanded && WIDGETS.TIMER !== $focusedWidget
  }
)
const showScalerValueInToggle = derived(
  [focusedWidget, scaleFactor],
  ([$focusedWidget, $scaleFactor]) => {
      return $focusedWidget !== WIDGETS.SCALER && $scaleFactor !== 1;
  }
)

function onResize() {
  const $isExpanded = window.innerWidth >= expandedBreakpoint;

  if (get(isExpanded) === $isExpanded) return;

  isExpanded.set($isExpanded);
  if (!$isExpanded) return;
  focusedWidget.set(null);
}
function toggleMode() {
  mode.update(($mode) => MODES[$mode === MODES.READ ? "EDIT" : "READ"]);
}
function init() {
  resizeObserver.observe(document.documentElement);

  return cleanup;
}
function cleanup() {
  resizeObserver.disconnect();
}
function toggleWidget(widget: Widget) {
  focusedWidget.update(($focusedWidget) =>
    $focusedWidget !== widget ? widget : null
  );
}

export {
  RecipeNav as default,
  RecipesButton,
  ModeToggleSwitch,
  SectionJumper,
  Scaler,
  Timer,
  //
  MODES,
  WIDGETS,
  type Mode,
  //
  isExpanded,
  focusedWidget,
  mode,
  showScalerToggle, 
  showScalerValueInToggle,
  //
  toggleMode,
  toggleWidget,
  init,
};
