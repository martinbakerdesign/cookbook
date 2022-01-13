import { ingredientUnits } from "utils/units";

export default function ingredientToContent(ingredient) {
  const { text } = ingredient;
  if (!text || !text.length) return null;
  let noHTML = text.replace(/&nbsp;/g, " ");
  let keys = Object.keys(ingredientUnits).sort((a, b) =>
    a.length < b.length ? 1 : -1
  );
  let regex = new RegExp(
    `(?<quantity>\\d+ to \\d+|\\d*\\s*\\d+\\/\\d+|\\d+\\.\\d+|\\d+)[-\\s]*(?<unit>${keys.join(
      "|"
    )})*[s(es)]*(?=\\s+|\\b)`,
    "i"
  );

  let matches = regex.exec(noHTML);

  if (!matches) {
    return [{ type: "text", text }];
  } else {
    let replaceRegex = new RegExp(`(${matches[0]})`);

    let str = noHTML.replace(replaceRegex, "<quantity>$1</quantity>");

    // let content = str.split(/<\/*quantity>/g);
    let split = str.split(/(<quantity>|<\/quantity>)/g);

    let result = [];
    let fStr;
    let nextQuantity = false;
    for (let f = 0; f < split.length; f++) {
      fStr = split[f];
      fStr === "<quantity>" && (nextQuantity = true);
      if (!fStr.length || fStr === "<quantity>" || fStr === "</quantity>")
        continue;
      result.push({
        type: "text",
        text: fStr,
        ...(nextQuantity && { marks: [{ type: "quantity" }] }),
      });
      nextQuantity = false;
    }

    return result;
  }
}
