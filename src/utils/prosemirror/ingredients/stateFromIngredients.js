import { EditorState } from "prosemirror-state";
import ingredientsToStateJSON from "utils/prosemirror/ingredients/ingredientsToStateJSON";
import ingredientsSchema from "schemas/ingredient";
import plugins from "../plugins";

export default function stateFromIngredients(ingredients) {
  return EditorState.create({
    schema: ingredientsSchema,
    plugins: plugins().ingredients,
    doc: ingredientsSchema.nodeFromJSON(ingredientsToStateJSON(ingredients)),
  });
}
