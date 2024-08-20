import replaceUnicodeFractions from "utils/text/replaceUnicodeFractions";
import getHeadingTextContent from "./getHeadingTextContent";

function applyTransformations(src, transformations = []) {
  if (!transformations.length || !src || !src.length) return src;

  let output = src;

  for (let t of transformations) {
    output = t(output);
  }
  return output;
}
function replaceSteps(src) {
  return src.replace(/step \d+/gi, "");
}
function replaceDoubleSpaces(src) {
  return src.replace(/\s+/g, " ");
}
function replaceFractionSymbols(src) {
  return src
    .replace(/½/g, "1/2")
    .replace(/⅓/g, "1/3")
    .replace(/⅕/g, "1/5")
    .replace(/⅙/g, "1/6")
    .replace(/⅛/g, "1/8")
    .replace(/⅔/g, "2/3")
    .replace(/⅖/g, "2/5")
    .replace(/⅚/g, "5/6")
    .replace(/⅜/g, "3/8")
    .replace(/¾/g, "3/4")
    .replace(/⅗/g, "3/5")
    .replace(/⅝/g, "5/8")
    .replace(/⅞/g, "7/8")
    .replace(/⅘/g, "4/5")
    .replace(/¼/g, "1/4")
    .replace(/⅐/g, "1/7")
    .replace(/⅑/g, "1/9")
    .replace(/⅒/g, "1/10")
    .replace(/↉/g, "0/3");
}
function replaceDegrees(src) {
  return src
    .replace(/ degrees Celsius/gi, "°C")
    .replace(/ degrees C/gi, "°C")
    .replace(/ degrees Fahrenheit/gi, "°F")
    .replace(/ degrees F/gi, "°F");
}
function replaceIllegalChars(src) {
  return src.replace(
    /[^0-9a-zA-Z:, \°\&\(\)\.\;\:\'\"\?\/\{\}\[\]\+\=-\_*&^%$#@!~`]+/,
    ""
  );
}
function replaceNewLines(src) {
  return src.replace(/\n+\s+/g, " ");
}

function replaceSymbols (src) {
  return src.replace(/[▢]/g, '')
}

function removeImages (src) {
  return src.replace(/<img[^>]*>/g, '')
}

function cleanText(text) {
  let cleaned = applyTransformations(text.trim(), [
    removeImages,
    replaceUnicodeFractions,
    replaceDegrees,
    // replaceIllegalChars,
    // replaceNewLines,
    replaceDoubleSpaces,
    replaceSymbols
  ]).trim();
  return cleaned;
}


export {
  getHeadingTextContent,
  cleanText
}