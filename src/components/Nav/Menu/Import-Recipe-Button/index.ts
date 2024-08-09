import NewRecipeButton from "./Nav--Menu__Import-Recipe-Button.svelte";
import { derived } from "svelte/store";
import { Widgets } from "..";
import { showModal } from "store/modals";
import { id as modalId } from 'routes/Menu/Modals/Import'

const iconProps = {
  icon: "import--20",
  size: 20,
  label:  "Import recipe",
};


function getShouldHideStore (isExpanded, widgetFocus) {
  return derived([isExpanded, widgetFocus], ([$isExpanded, $widgetFocus]) => !$isExpanded && $widgetFocus === Widgets.FILTERS)
}

function onClick () {
  showModal(modalId)
}


export {
  NewRecipeButton as default,
  //
  iconProps,
  //
  getShouldHideStore,
  onClick
};
