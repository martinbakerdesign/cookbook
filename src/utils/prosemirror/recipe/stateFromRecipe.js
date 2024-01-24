import { EditorState } from "prosemirror-state";
import recipeToStateJSON from "utils/prosemirror/recipe/recipeToStateJSON";
import schema from "schemas/recipe";
import plugins from "../plugins";

export default function stateFromRecipe(recipe) {
  console.log({ recipe });
  return EditorState.create({
    schema,
    plugins: plugins(),
    doc: schema.nodeFromJSON(recipeToStateJSON(recipe)),
  });
}
