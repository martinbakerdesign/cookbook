import { writable } from "svelte/store";

export { default as default } from "./ContextMenu.svelte";

import Divider from "./ContextMenu__Divider.svelte";
export { default as Divider } from "./ContextMenu__Divider.svelte";

import Item from "./ContextMenu__Item.svelte";
export { default as Item } from "./ContextMenu__Item.svelte";

export type ContextMenuItem = {
  type: typeof itemTypes[keyof typeof itemTypes],
  label?: string,
  icon?: string,
  onClick?: Function,
};

let recipeId = "";
export function setRecipeId($recipeId) {
  recipeId = $recipeId;
}

let hideContextCallback = () => {};
export function setHideContextCallback(callback) {
  hideContextCallback = callback;
}

export const itemTypes = {
  ITEM: "ITEM",
  DIVIDER: "DIVIDER",
} as const;

export const itemComponents = {
  [itemTypes.ITEM]: Item,
  [itemTypes.DIVIDER]: Divider,
};

export const items = writable<ContextMenuItem[]>([]);

export function setItems ($items) {
  if (!$items || !$items.length) return;
  items.set($items);
}