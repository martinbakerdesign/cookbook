export default function tagsToState(tags) {
  let doc = {
    type: "doc",
    content: [],
  };

  let tag;
  for (let i = 0; i < tags.length; i++) {
    tag = tags[i];

    let node = {
      type: "tag",
      content: [
        {
          type: "text",
          text: tag,
        },
      ],
    };

    doc.content.push(node);
  }

  return doc;
}
