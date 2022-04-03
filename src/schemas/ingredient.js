import { Schema } from "prosemirror-model";
import { isUserAuthor } from "store/";
import { get } from "svelte/store";

const ingredientsSchema = new Schema({
  nodes: {
    doc: { content: "(ingredient | header)+" },
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
          "h3",
          {
            "data-index": node.attrs.index,
            "data-dragging": node.attrs.dragging,
            "data-type": "header",
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "h3",
          getAttrs: (dom) => {
            return { index: dom.dataset.index };
          },
        },
      ],
    },
    ingredient: {
      content: "text*",
      inline: false,
      draggable: true,
      attrs: {
        index: {
          default: null,
        },
        quantity: {
          default: 0,
        },
        unit: {
          default: "",
        },
      },
      toDOM(node) {
        return [
          "ingredient",
          {
            "data-index": node.attrs.index,
            "data-quantity": node.attrs.quantity,
            "data-unit": node.attrs.unit,
            "data-type": "ingredient",
            "data-dragging": node.attrs.dragging,
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "ingredient",
          getAttrs: (dom) => {
            return {
              index: dom.dataset.index,
              quantity: dom.dataset.quantity,
              unit: dom.dataset.unit,
            };
          },
        },
      ],
    },
    text: { inline: true, draggable: false },
  },
  marks: {},
});

export default ingredientsSchema;
