import { METHOD_TYPES } from "store/models/method";

export default function methodToStateJSON(method) {
  let doc = {
    type: "doc",
    content: [],
  };

  console.log("methodToStateJSON", { method });

  let step, node, type;
  for (let i = 0; i < method.length; i++) {
    step = method[i];
    type = types[step.type];

    if (!step.text.trim().length) continue;

    node = {
      type,
      attrs: {
        index: i,
      },
      content: [
        {
          type: "text",
          text: step.text,
        },
      ],
    };

    doc.content.push(node);
  }

  return doc;
}

const types = {
  [METHOD_TYPES.STEP]: "step",
  [METHOD_TYPES.HEADER]: "header",
};
