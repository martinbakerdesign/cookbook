import { EditorState } from "prosemirror-state";
import { refs, triggerSaveWithNewState } from "store/recipe";
import recipeToStateJSON from "utils/prosemirror/recipe/recipeToStateJSON";
import stateToRecipe from "utils/prosemirror/recipe/stateToRecipe";
import schema from "schemas/recipe";
import replaceUnitWithShorthand from "utils/units/replaceUnitsWithShorthand";

class UnitShorthandButton {
  constructor() {
    this.command = this.useShorthand.bind(this);
  }
  init = function (view) {
    this.dom = refs.editorActions.shorthand;
    this.view = view;
  };
  useShorthand = function (state, dispatch) {
    const $recipe = stateToRecipe(state);

    const newStateJSON = recipeToStateJSON({
      ...$recipe,
      ingredients: $recipe.ingredients.map((step) => ({
        ...step,
        text: replaceUnitWithShorthand(step.text),
      })),
      mise_en_place: $recipe.mise_en_place.map((step) => ({
        ...step,
        text: replaceUnitWithShorthand(step.text),
      })),
      method: $recipe.method.map((step) => ({
        ...step,
        text: replaceUnitWithShorthand(step.text),
      })),
    });
    
    const newState = EditorState.create({
      schema: refs.view.state.schema,
      doc: schema.nodeFromJSON(newStateJSON),
      plugins: refs.view.state.plugins,
    });

    refs.view.updateState(newState);

    triggerSaveWithNewState(newState);

    return true;
  };
  getDom = () => {
    return refs.editorActions?.shorthand ?? null;
  };
}

const unitShorthandButton = new UnitShorthandButton();

export default unitShorthandButton;
