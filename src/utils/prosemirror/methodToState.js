import { METHOD_TYPES } from "store/models/method";

export default function methodToState(method) {
  let doc = {
    type: "doc",
    content: [],
  };

  let step;
  for (let i = 0; i < method.length; i++) {
    step = method[i];

    let node = {
      type: types[step.type],
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
