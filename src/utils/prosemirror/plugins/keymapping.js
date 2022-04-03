import { baseKeymap } from "prosemirror-commands";
import { redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";

const keymapping = keymap({
  ...baseKeymap,
  "Mod-z": undo,
  "Mod-y": redo,
});

export default keymapping;
