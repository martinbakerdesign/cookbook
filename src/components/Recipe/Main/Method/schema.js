import { Schema } from "prosemirror-model";

const methodSchema = new Schema({
  nodes: {
    doc: { content: "(step | header)+" },
    header: {
      content: "text*",
      inline: false,
      toDOM(node) {
        return ["dd", { class: "method__item method__header" }, 0];
      },
      parseDOM: [{ tag: "dd" }],
    },
    step: {
      content: "text*",
      inline: false,
      toDOM(node) {
        return ["dt", { class: "method__item method__step" }, 0];
      },
      parseDOM: [{ tag: "dt" }],
    },
    text: { inline: true },
  },
  marks: {},
});

export default methodSchema;
