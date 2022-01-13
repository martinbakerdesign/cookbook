import { EditorState } from "prosemirror-state";
import methodToState from "utils/prosemirror/methodToState";
import methodSchema from "../Method/schema";
import plugins from "./plugins";

export default function stateFromMethod(method) {
  return EditorState.create({
    schema: methodSchema,
    plugins: plugins.method,
    doc: methodSchema.nodeFromJSON(methodToState(method)),
  });
}
