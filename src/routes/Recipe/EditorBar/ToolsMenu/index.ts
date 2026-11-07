import { get, writable } from "svelte/store";

import ToggleMenu from "./ToolsMenuToggle.svelte";

import InsertDegrees from "./InsertDegrees";
import UnitSystemSwapper from "./UnitSystemSwapper";
import UseUnitShorthand from "./UseUnitShorthand";
import CupsToGrams from "./CupsToGrams";

const refs = {
  menu: null,
};

const isOpen = writable(false);

function toggleMenu() {
  isOpen.update((value) => !value);
}

// TODO Create on click out functionality
function setupClickOut(el) {
refs.menu = el;
  window.addEventListener("click", handleClick);
}
function handleClick(e) {
  if (!get(isOpen) || refs?.menu.contains(e.target) || refs?.menu === e.target)
    return;
  isOpen.set(false);
}

export {
  ToggleMenu as default,
  //
  InsertDegrees,
  UnitSystemSwapper,
  UseUnitShorthand,
  CupsToGrams,
  //
  refs,
  //
  isOpen,
  toggleMenu,
  setupClickOut,
};
