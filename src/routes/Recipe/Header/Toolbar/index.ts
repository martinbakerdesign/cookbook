import { get } from "svelte/store";
import scaleRecipe from "utils/recipes/scale";
import stateFromRecipe from "utils/prosemirror/recipe/stateFromRecipe";
import { refs } from "store/recipe";
import recipe from "store/index";

export { default as default } from "./Recipe__Header__Toolbar.svelte";

export { default as Divider } from "./Recipe__Header__Toolbar__Divider.svelte";
export { default as BlockType } from "./BlockType";
export { default as Redo } from "./Redo";
export { default as Scale } from "./Scale";
export { default as Undo } from "./Undo";
export { default as UnitSelect } from "./UnitSelect";

export function scale(scaleFactor) {
  if (!refs.view) return;

  const scaled = scaleRecipe(get(recipe), +scaleFactor);

  const newState = stateFromRecipe(scaled);

  refs.view.updateState(newState);
}
