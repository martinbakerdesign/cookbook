import { Plugin } from "prosemirror-state";

const pastePlugin = new Plugin({
  props: {
    handlePaste: function (view, event, slice) {
      console.log({ slice, view });

      return true;
    },
  },
});

export default pastePlugin;
