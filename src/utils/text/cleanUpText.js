import removeEmojis from "./removeEmojis";
import replaceUnicodeFractions from "./replaceUnicodeFractions";

export default function cleanUpText(src) {
  let cleanText = replaceUnicodeFractions(src);
  return cleanText;
}
