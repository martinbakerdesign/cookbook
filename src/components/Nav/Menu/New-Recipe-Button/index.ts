import { push, replace } from "svelte-spa-router";
import createRecipe from "utils/db/recipes/createRecipe";

import NewRecipeButton from "./Nav--Menu__New-Recipe-Button.svelte";
import { derived } from "svelte/store";
import { Widgets } from "..";
import handleLinkClick from "utils/router/handleLinkClick";
import { mode, MODES } from "store/recipe";

const iconProps = {
  icon: "new--20",
  size: 20,
  label: "New recipe",
};

const openNewRecipe = handleLinkClick(async () => {
  push("/new");

  try {
    const newRecipe = await createRecipe();
    console.log(newRecipe);
    replace(`/${newRecipe.id}`);
    mode.set(MODES.EDIT);
  } catch (err) {
    console.error('Error creating new recipe: '+err?.message??err)
  }
});
function getShouldHideStore(isExpanded, widgetFocus) {
  return derived(
    [isExpanded, widgetFocus],
    ([$isExpanded, $widgetFocus]) =>
      !$isExpanded && $widgetFocus === Widgets.FILTERS
  );
}

export {
  NewRecipeButton as default,
  //
  iconProps,
  //
  openNewRecipe,
  getShouldHideStore,
};
