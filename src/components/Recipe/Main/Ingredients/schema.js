import { Schema } from "prosemirror-model";

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
      // marks: "",
      toDOM(node) {
        return [
          "h3",
          {
            "data-index": node.attrs.index,
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
      // marks: "quantity",
      toDOM(node) {
        return [
          "ingredient",
          {
            "data-index": node.attrs.index,
            "data-quantity": node.attrs.quantity,
            "data-unit": node.attrs.unit,
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
