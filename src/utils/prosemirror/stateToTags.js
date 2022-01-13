export default function proseToTags(state) {
  const {
    doc: { content },
  } = state.toJSON();

  let tags = [];

  let node;
  for (let n = 0; n < content.length; n++) {
    node = content[n];

    if (!node.content || node.type === "taginput") continue;

    tags.push(node.content[0].text);
  }

  return tags;
}
