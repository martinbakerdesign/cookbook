import ingredientUnits from "data/units/ingredient";
import _quantity from "./expressions/quantity";
import _units from "./expressions/units";
import parseQuantity from "./parseQuanitity";
// import parse from "parse-ingredient";
// import quantity from "numeric-quantity";
// import Qty from "js-quantities/esm";

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

function parseIngredient(str) {
  if (!str || !str.length) return null;
  let noHTML = str.replace(/&nbsp;/g, " ");

  let quantityMatches = new RegExp(
    `${_quantity}?[-\\s]?${_units}*(?=\\s+|\\b)`
  ).exec(noHTML);
  let unitMatches = new RegExp(
    `(?<outer>(?:${_quantity}[ -\\s]?)${_units})[ \\s\\b]`
  ).exec(noHTML);

  // let parsed = parse(noHTML);
  // console.log({ parsed });
  // console.log({ quantity: quantity(noHTML) });

  // console.log(Qty(noHTML));

  let rest = str
    .replace(new RegExp(`${_quantity}?[-\\s]?${_units}*(?=\\s+|\\b|\.|\,)`), "")
    .trim();
  let ingredient = rest.split(/[\,\;]/)[0].trim();
  let notes = rest.split(/[\,\;]/)[1]?.trim() ?? null;

  let quantity = quantityMatches ? parseQuantity(quantityMatches) : null;

  let unit = unitMatches?.groups?.unit
    ? ingredientUnits[unitMatches?.groups?.unit]
    : null;

  let result = {
    // quantity: [parsed.quantity, parsed.quantity2],
    // unit: parsed.unitOfMeasure,
    // description:
    // ingredient: parsed.description,
    quantity,
    unit,
    ingredient,
    notes,
    rest,
  };

  return result;
}

export default parseIngredient;

class Quantity {
  constructor(val) {
    this.val = val;

    this.type = this.getValueType();
  }
  getValueType = function () {
    return Array.isArray(this.val)
      ? "range"
      : this.val != null
      ? "single"
      : null;
  };
}
