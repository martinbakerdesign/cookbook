import { METHOD_TYPES } from "store/models/method";
// import parseMethod from "utils/text/parseMethod";

export default function proseToMethod(state) {
  const {
    doc: { content },
  } = state.toJSON();

  let method = [];

  let node, type;
  for (let n = 0; n < content.length; n++) {
    node = content[n];
    if (!node.content) continue;
    type = types[node.type];

    let obj = {
      type,
      text: node.content[0].text,
    };

    method.push(obj);
  }

  return method;
}

const types = {
  step: METHOD_TYPES.STEP,
  header: METHOD_TYPES.HEADER,
};
