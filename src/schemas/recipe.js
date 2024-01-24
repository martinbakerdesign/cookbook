import { Schema } from "prosemirror-model";

export const recipeNodeTypes = {
  HEADER: "HEADER",
  INGREDIENTS: "INGREDIENTS",
  INGREDIENT: "INGREDIENT",
  METHOD: "METHOD",
  STEP: "STEP",
};

const recipeSchema = new Schema({
  nodes: {
    doc: {
      content: `${recipeNodeTypes.INGREDIENTS} ${recipeNodeTypes.METHOD}`,
    },
    [recipeNodeTypes.INGREDIENTS]: {
      content: `(${recipeNodeTypes.INGREDIENT} | ${recipeNodeTypes.HEADER})+`,
      inline: false,
      draggable: false,
      selectable: false,
      definingAsContext: true,
      defining: true,
      isolating: true,
      toDOM(node) {
        return [
          "section",
          {
            id: "recipe__editor--ingredients",
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "section",
        },
      ],
    },
    [recipeNodeTypes.METHOD]: {
      content: `(${recipeNodeTypes.STEP} | ${recipeNodeTypes.HEADER})+`,
      inline: false,
      draggable: false,
      selectable: false,
      definingAsContext: true,
      defining: true,
      isolating: true,
      toDOM(node) {
        return [
          "section",
          {
            id: "recipe__editor--method",
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "section",
        },
      ],
    },
    [recipeNodeTypes.HEADER]: {
      content: "text*",
      inline: false,
      draggable: false,
      attrs: {
        index: {
          default: null,
        },
      },
      toDOM(node) {
        return [
          "h3",
          {
            class: "recipe__editor__item",
            "data-index": node.attrs.index,
            "data-type": "header",
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "h3",
          getAttrs: (dom) => {
            return {
              index: dom.dataset.index,
            };
          },
        },
      ],
    },
    [recipeNodeTypes.INGREDIENT]: {
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
            class: "recipe__editor__item",
            "data-type": "ingredient",
            "data-index": node.attrs.index,
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
    [recipeNodeTypes.STEP]: {
      content: "text*",
      inline: false,
      draggable: false,
      attrs: {
        index: {
          default: null,
        },
      },
      toDOM(node) {
        return [
          "step",
          {
            class: "recipe__editor__item",
            "data-type": "step",
            "data-index": node.attrs.index,
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "step",
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

export default recipeSchema;
