import { Schema } from "prosemirror-model";
// import { isUserAuthor } from "store/";
// import { get } from "svelte/store";

const methodSchema = new Schema({
  nodes: {
    doc: { content: "(step | header)+" },
    header: {
      content: "text*",
      inline: false,
      draggable: true,
      attrs: {
        index: {
          default: null,
        },
      },
      toDOM(node) {
        return [
          "dt",
          {
            class: "method__item",
            "data-index": node.attrs.index,
            "data-type": "header",
            // draggable: "true",
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "dt",
          getAttrs: (dom) => {
            return {
              index: dom.dataset.index,
            };
          },
        },
      ],
    },
    step: {
      content: "text*",
      inline: false,
      draggable: true,
      attrs: {
        index: {
          default: null,
        },
      },
      toDOM(node) {
        return [
          "dd",
          {
            class: "method__item",
            "data-index": node.attrs.index,
            "data-type": "step",
            // draggable: "true",
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "dd",
          getAttrs: (dom) => {
            return {
              index: dom.dataset.index,
            };
          },
        },
      ],
    },
    text: { inline: true, draggable: false },
  },
  marks: {},
});

export default methodSchema;
