import { Schema } from "prosemirror-model";

const NODES = {
  HEADER: "HEADER",
  INGREDIENTS: "INGREDIENTS",
  MISE_EN_PLACE: "MISE_EN_PLACE",
  INGREDIENT: "INGREDIENT",
  METHOD: "METHOD",
  NOTES: "NOTES",
  STEP: "STEP",
  NOTE: "NOTE",
};

const PARENT_NODES = [
  NODES.INGREDIENTS,
  NODES.MISE_EN_PLACE,
  NODES.METHOD,
  NODES.NOTES,
];

const CHILD_NODES = [
  NODES.HEADER,
  NODES.INGREDIENT,
  NODES.STEP,
  NODES.NOTE,
];

const NODE_OPTIONS = {
  [NODES.INGREDIENTS]: [
    {
      type: NODES.HEADER,
      name: "Heading",
    },
    {
      type: NODES.INGREDIENT,
      name: "Ingredient",
    },
  ],
  [NODES.MISE_EN_PLACE]: [
    {
      type: NODES.HEADER,
      name: "Heading",
    },
    {
      type: NODES.INGREDIENT,
      name: "Ingredient",
    },
  ],
  [NODES.METHOD]: [
    {
      type: NODES.HEADER,
      name: "Heading",
    },
    {
      type: NODES.STEP,
      name: "Step",
    },
  ],
  [NODES.NOTES]: [
    {
      type: NODES.NOTE,
      name: "Note",
    },
  ],
};

const sectionClasses = 'border-b px-page pt-10 pb-12 last:border-b-0 last:pb-main-b';

const recipeSchema = new Schema({
  nodes: {
    doc: {
      content: `${NODES.INGREDIENTS} ${NODES.MISE_EN_PLACE} ${NODES.METHOD} ${NODES.NOTES}`,
    },
    [NODES.INGREDIENTS]: {
      content: `(${NODES.INGREDIENT} | ${NODES.HEADER})+`,
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
            'data-section': NODES.INGREDIENTS,
            'data-title': 'Ingredients',
            class: sectionClasses
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
    [NODES.MISE_EN_PLACE]: {
      content: `(${NODES.INGREDIENT} | ${NODES.HEADER})+`,
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
            id: "recipe__editor--miseenplace",
            'data-section': NODES.MISE_EN_PLACE,
            'data-title': 'Mise en place',
            class: sectionClasses
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
    [NODES.METHOD]: {
      content: `(${NODES.STEP} | ${NODES.HEADER})+`,
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
            'data-section': NODES.METHOD,
            'data-title': 'Method',
            class: sectionClasses
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
    [NODES.NOTES]: {
      content: `(${NODES.NOTE})+`,
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
            id: "recipe__editor--notes",
            'data-section': NODES.NOTES,
            'data-title': 'Notes',
            class: sectionClasses
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
    //
    [NODES.HEADER]: {
      content: "text*",
      inline: false,
      draggable: false,
      attrs: {
        index: {
          default: null,
        },
        hasFocus: {
          default: false
        },
        isEmpty: {
          default: true
        },
      },
      toDOM(node) {
        return [
          "h3",
          {
            class: "recipe__editor__item block text-heading-md text-text mb-8 mt-6 first:mt-0"+(node.content.size === 0 || node.attrs.isEmpty ? ' empty' : '')+(node.attrs.hasFocus ? ' has-focus' : ''),
            "data-index": node.attrs.index,
            "data-type": NODES.HEADER,
            'data-placeholder': 'Heading'
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
    [NODES.INGREDIENT]: {
      content: "text*",
      inline: false,
      draggable: false,
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
        hasFocus: {
          default: false
        },
        isEmpty: {
          default: true
        },
      },
      toDOM(node) {
        return [
          "div",
          {
            class: "recipe__editor__item block mb-2 last:mb-0"+(node.content.size === 0 || node.attrs.isEmpty ? ' empty' : '')+(node.attrs.hasFocus ? ' has-focus' : ''),
            "data-type": NODES.INGREDIENT,
            "data-index": node.attrs.index,
            'data-placeholder': 'Ingredient'
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "div",
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
    [NODES.STEP]: {
      content: "text*",
      inline: false,
      draggable: false,
      attrs: {
        index: {
          default: null,
        },
        hasFocus: {
          default: false
        },
        isEmpty: {
          default: true
        },
      },
      toDOM(node) {
        return [
          "div",
          {
            class: "recipe__editor__item block mb-6 last:mb-0 pl-14"+(node.content.size === 0 || node.attrs.isEmpty ? ' empty' : '')+(node.attrs.hasFocus ? ' has-focus' : ''),
            "data-type": NODES.STEP,
            "data-index": node.attrs.index,
            'data-placeholder': 'Step'
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "div",
          getAttrs: (dom) => {
            return {
              index: dom.dataset.index,
            };
          },
        },
      ],
    },
    [NODES.NOTE]: {
      content: "text*",
      inline: false,
      draggable: false,
      attrs: {
        index: {
          default: null,
        },
        hasFocus: {
          default: false
        },
        isEmpty: {
          default: true
        },
      },
      toDOM(node) {
        return [
          "div",
          {
            class: "recipe__editor__item block mb-6 last:mb-0"+(node.content.size === 0 || node.attrs.isEmpty ? ' empty' : '')+(node.attrs.hasFocus ? ' has-focus' : ''),
            "data-type": NODES.NOTE,
            "data-index": node.attrs.index,
            'data-placeholder': 'Note'
          },
          0,
        ];
      },
      parseDOM: [
        {
          tag: "div",
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

export {
  recipeSchema as default,
  //
  NODES,
  PARENT_NODES,
  CHILD_NODES,
  NODE_OPTIONS
}
