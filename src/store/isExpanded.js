import { focusedWidget } from "components/Nav/Recipe";
import { get, writable } from "svelte/store";

const expandedBreakpoint = 1024;

const isExpanded = writable(false);

function onResize(callback = null) {
  const $isExpanded = window.innerWidth >= expandedBreakpoint;

  if (get(isExpanded) === $isExpanded) return;

  isExpanded.set($isExpanded);
  if (!$isExpanded) return;
  focusedWidget.set(null);
}

export {
    isExpanded as default,
    onResize
}