import { EditorState } from "prosemirror-state";
import methodToStateJSON from "./methodToStateJSON";
import methodSchema from "schemas/method";
import plugins from "../plugins";

export default function stateFromMethod(method) {
  return EditorState.create({
    schema: methodSchema,
    plugins: plugins().method,
    doc: methodSchema.nodeFromJSON(methodToStateJSON(method)),
  });
}
