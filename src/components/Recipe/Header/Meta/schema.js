import { Schema } from "prosemirror-model";

const tagsSchema = new Schema({
  nodes: {
    doc: { content: "tag* input*" },
    tag: {
      content: "text*",
      inline: true,
      toDOM(node) {
        return ["tag", 0];
      },
      parseDOM: [{ tag: "tag" }],
    },
    input: {
      content: "text*",
      inline: true,
      editable: true,
      toDOM(node) {
        return ["taginput", 0];
      },
      parseDOM: [{ tag: "taginput" }],
    },
    text: { inline: true },
  },
  marks: {},
});

export default tagsSchema;
