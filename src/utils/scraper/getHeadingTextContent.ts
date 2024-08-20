function getHeadingTextContent(heading) {
  if (!heading) return "";

  let text = "";
  for (const childNode of heading.childNodes) {
    if (childNode.nodeType === Node.TEXT_NODE) {
      text += childNode.textContent;
    }
  }

  return text.toLowerCase().trim();
}

export { getHeadingTextContent as default };
