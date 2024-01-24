import ToolbarGroup from "./group";
import redoButton from "./redoButton";
import undoButton from "./undoButton";

const historyGroup = new ToolbarGroup(
  [undoButton, redoButton],
  "recipe__header__toolbar__undo-redo"
);

export default historyGroup;
