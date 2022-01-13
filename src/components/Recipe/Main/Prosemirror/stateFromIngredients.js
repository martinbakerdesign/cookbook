import { EditorState } from "prosemirror-state";
import ingredientsToState from "utils/prosemirror/ingredientsToState";
import ingredientsSchema from "../Ingredients/schema";
import plugins from "./plugins";

export default function stateFromIngredients(ingredients) {
  return EditorState.create({
    schema: ingredientsSchema,
    plugins: plugins.ingredients,
    doc: ingredientsSchema.nodeFromJSON(ingredientsToState(ingredients)),
  });
}
