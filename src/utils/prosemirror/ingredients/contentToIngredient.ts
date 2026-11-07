import parseIngredient from "utils/text/parseIngredient";

export default function contentToIngredient(content) {
  let str = content.reduce((p, c) => p + c.text, "");
  return {
    text: str,
    ...parseIngredient(str),
  };
}
