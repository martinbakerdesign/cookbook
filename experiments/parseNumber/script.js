import replaceUnicodeFractions from "./replaceUnicodeFractions.js";
import unitRegexp from "./unitExpression.js";

/**
 * 1. Find all numbers (ranges, int, float, fraction, string)
 * 2. Search around each number for other values that could be part of
 * a possible range, fraction, deconstructed value, deconstructed range etc.
 * 3. Expand each match if there is a unit of measurement next to it
 * 4. Return input as:
 *    [
 *      {pos: int, type: 'text', text: '', size: int},
 *      {pos: int, type: 'value', value: [0,0], unit: null, text: '', size: int},
 *    ]
 */
// 1.5 - 2 2" piece of ginger
// 1 1/2 - 2 2" piece of ginger ({type: deconstructed, value: {type: range, value: [1.5,2]}}})

// Ingredient
/**
 * [
 *  {
 *    pos: 0
 *    size: 7,
 *    type: 'quantity',
 *    textContent: '5 grams',
 *    content: [
 *      {
 *        pos: 0
 *        size: 1,
 *        type: 'number',
 *        text: '5',
 *        value: 5,
 *        format: 'digit'
 *      },
 *      {
 *        pos: 1,
 *        size: 1,
 *        type: 'text',
 *        text: ' ',
 *      },
 *      {
 *        pos: 2,
 *        size: 5,
 *        type: 'unit',
 *        name: 'gram',
 *        text: 'grams',
 *      },
 *    ]
 *  },
 *  {
 *    pos: 7,
 *    size: 7,
 *    type: 'text',
 *    text: ' Onions',
 *  },
 * ]
 */

let scale = 1;
let ingredients;

const regExpAtoms = {
  range: "\\s?(?:to|-)\\s?",
  fraction: "(?:\\d+\\s)?\\d+/\\d+",
  decimal: "\\d+\\.\\d+",
  float: "\\d+\\.\\d+",
  digit: "\\d+",
  number: "(:\\d+.)?\\d+",
  int: "\\d+",
  numbers: [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
  ],
};
const regExpressions = {
  isRange: new RegExp(`\\d(?:${regExpAtoms.range})\\d`),
  unit: new RegExp(`(?<=\\d[\\s-]?)(?<unit>${unitRegexp})(?!\\w)`, "g"),
  // deconstructed: new RegExp(
  //   `((?<quantity>(?<range1>(?:(?:\\d+\\s)?\\d+\\/\\d+)|(?:\\d+\\.\\d+)|(?:\\d+)|(?:${regExpAtoms.numbers.join("|")}}))(?:\\s?(?:to|-)\\s?)(?<range2>(?:(?:\\d+\\s)?\\d+\\/\\d+)|(?:\\d+\\.\\d+)|(?:\\d+)|(?:${regExpAtoms.numbers.join("|")}})))[x*]?\\s\\(?(?<quantified>\\d+))`,
  //   "g"
  // ),
  deconstructed: new RegExp(
    `((?<quantity>(?:${regExpAtoms.number}))[x*]?\\s\\(?(?<quantified>(?:${regExpAtoms.number})))`,
    "g"
  ),
  range: new RegExp(
    `(?<quantity>(?<range1>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit}))(?:${regExpAtoms.range})(?<range2>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit})))`,
    "g"
  ),
  number: new RegExp(
    `(?<quantity>(?:${regExpAtoms.float})|(?:${regExpAtoms.int}))(?:[\\s\-])?`,
    "g"
  ),
  fraction: new RegExp(
    `(?<quantity>${regExpAtoms.fraction})`,

    "g"
  ),
  valuedUnit: (valueStr) =>
    new RegExp(`(?<quantity>${valueStr})[\\s\-]?(?<unit>${unitRegexp})(?!\\w)`),
  unitRange: (unitStr) =>
    new RegExp(
      `(?<quantity>(?<range1>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit}))(?:${regExpAtoms.range})(?<range2>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit})))[\\s\-]?${unitStr}`
    ),
  unitDeconstructed: (unitStr) =>
    new RegExp(
      `(?<quantity>(?:\\d+|${regExpAtoms.numbers.join(
        "|"
      )})\\s\\d+)[\\s\-]?${unitStr}`
    ),
  stringNumbers: new RegExp(`${regExpAtoms.numbers.join("|")}`, "g"),
  unitSingleQuantity: (unitStr) =>
    new RegExp(
      `(?<quantity>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit}))[\\s\-]?${unitStr}`
    ),
  singleQuantity: new RegExp(
    `(?<quantity>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit}))`,
    "g"
  ),
  digit: new RegExp(
    `(?<quantity>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit}))[\\s\-]?`
  ),
};

function findValues(str) {
  let values = [];
  let deconstructed = findDeconstructeds(str);
  console.log({ deconstructed });
  let ranges = findRanges(deconstructed[1]);
  let fractions = findFractions(ranges[1]);
  let numbers = findNumbers(fractions[1]);

  deconstructed[0] && (values = [...values, ...deconstructed[0]]);
  ranges[0] && (values = [...ranges[0]]);
  fractions[0] && (values = [...values, ...fractions[0]]);
  numbers[0] && (values = [...values, ...numbers[0]]);

  return values;
}
function findUnit(str) {
  let matches = [...str.matchAll(regExpressions.unit)];
  return matches.length > 0 ? matches : null;
}
function findDeconstructeds(str) {
  return findQuantity(
    str,
    quantityTypes.deconstructed,
    regExpressions.deconstructed
  );
}
function findRanges(str) {
  return findQuantity(str, quantityTypes.range, regExpressions.range);
}
function findFractions(str) {
  return findQuantity(str, quantityTypes.fraction, regExpressions.fraction);
}
function findNumbers(str) {
  return findQuantity(str, quantityTypes.number, regExpressions.number);
}
function findQuantity(str, quantityType, exp) {
  let matches = [...str.matchAll(exp)];
  let hasMatches = matches.length > 0;
  for (let match of matches) {
    str = str.replace(match[0], "");
  }
  return [
    hasMatches &&
      matches.map((m) => {
        let text =
          quantityType !== quantityTypes.deconstructed
            ? m.groups.quantity
            : m[0].trim();
        return {
          quantityType,
          text,
          quantityText: text,
          quantitySize: text.length,
          ...(quantityType === quantityTypes.range && {
            rangePos: [
              text.indexOf(m.groups.range1),
              text.indexOf(m.groups.range2),
            ],
            rangeSizes: [m.groups.range1.length, m.groups.range2.length],
          }),
          value: getValue(m, quantityType),
          ...(m.groups && { groups: m.groups }),
        };
      }),
    str,
  ];
}
function findRange(str, unit) {
  let match = regExpressions.unitRange(unit).exec(str);

  return match?.index != null
    ? {
        quantity: match?.groups?.range1
          ? [match.groups.range1, match.groups.range2]
          : null,
        index: match?.index ?? null,
        matchLength: match ? match[0].trim().length : 0,
        range: match ? [match.index, match.index + match[1].length] : null,
      }
    : null;
}
function findDeconstructed(str, unit) {
  let match = regExpressions.unitDeconstructed(unit).exec(str);

  return match?.index != null
    ? {
        quantity: match?.groups?.quantity ?? null,
        index: match?.index ?? null,
        matchLength: match ? match[0].trim().length : 0,
        range: match ? [match.index, match.index + match[1].length] : null,
      }
    : null;
}
function findSingleQuantity(str, unit) {
  let match = regExpressions.unitSingleQuantity(unit).exec(str);

  return match?.index != null
    ? {
        quantity: match.groups.quantity ?? null,
        index: match.index ?? null,
        matchLength: match ? match[0].trim().length : 0,
        range: match ? [match.index, match.index + match[1].length] : null,
      }
    : null;
}
function findNonUnitRange(str) {
  let match = [...str.matchAll(regExpressions.range)];

  return match;
}
function findNonUnitDeconstructed(str) {
  let match = [...str.matchAll(regExpressions.deconstructed)];

  return match;
}
function findNonUnitSingleQuantity(str) {
  let match = [...str.matchAll(regExpressions.singleQuantity)];

  return match;
}
function findUnits(srcStr, srcValues) {
  let values = [];
  let unit, unitValue;

  let workingStr = srcStr;
  for (let value of srcValues) {
    unitValue = findValuedUnit(workingStr, value);
    values.push(unitValue);
    workingStr = workingStr.replace(unitValue.text, "");
  }

  return values;
}
function findValuedUnit(str, value) {
  let exp = regExpressions.valuedUnit(value.text);
  let match = str.match(exp);

  match &&
    (match = {
      ...value,
      unitPos: str.indexOf(match.groups.unit),
      unitSize: match.groups.unit.length,
      unitText: match.groups.unit,
      unit: match.groups.unit,
      text: match[0],
    });

  return match ?? value;
}
function getValue(match, quantityType) {
  switch (quantityType) {
    default:
    case quantityTypes.integer:
    case quantityTypes.float:
    case quantityTypes.number:
      return +match.groups.quantity;
    case quantityTypes.fraction:
      return new Fraction(match[0]).valueOf();
    case quantityTypes.deconstructed:
      return [
        findValues(match.groups.quantity)[0],
        findValues(match.groups.quantified)[0],
      ];
    case quantityTypes.range:
      let quantities = [
        findValues(match.groups.range1),
        findValues(match.groups.range2),
      ].map((v) => ({ ...v[0], 0: v[0].text }));
      return quantities;
  }
}

const input = document.querySelector("#input");
const output = document.querySelector("#output");

class ScaleInput {
  constructor() {
    this.dom = {
      input: document.querySelector("#scale__input"),
      buttons: {
        neg: document.querySelector("#scale__inc--neg"),
        pos: document.querySelector("#scale__inc--pos"),
      },
    };

    scale = +this.dom.input.value;

    this.onInc = this.onInc.bind(this);
    this.onChange = this.onChange.bind(this);
    this.dom.buttons.neg.addEventListener("click", this.onInc);
    this.dom.buttons.pos.addEventListener("click", this.onInc);
    this.dom.input.addEventListener("input", this.onChange);
  }
  incScale = function (inc = 0) {
    let newScale = Math.max(1, scale + inc);
    scale = newScale;
  };
  onChange = function () {
    scale = +this.dom.input.value;
    this.updateParsed();
  };
  onInc = function ({ target }) {
    this.incScale(+target.dataset.inc);
    this.updateDom();
  };
  updateDom = function () {
    this.updateInput();
    this.updateParsed();
  };
  updateInput = function () {
    this.dom.input.value = scale.toFixed(1);
  };
  updateParsed = function () {
    onChange();
  };
}
new ScaleInput();

input.addEventListener("input", onChange);

function onChange() {
  let str = replaceUnicodeFractions(input.value);
  let strings = splitLines(str);
  let recipeStrings = strings.map((str) => new RecipeString(str));

  scale !== 1 && recipeStrings.forEach((str) => str.scale(scale));
  let markup = recipeStrings.map((str) => {
    let markup = str.text;
    for (let deco of str.decorations) {
      markup = markup.replace(deco.text, `<b>${deco.toString()}</b>`);
    }
    return markup;
  });

  output.innerHTML = strings
    .map((s, i) => {
      return `<div class="ingredient">${markup[i]}</div>`;
    })
    .join("");
}
function attachPos(str, matches) {
  let values = [];
  for (let match of matches) {
    values.push({
      quantityType: match.quantityType,
      pos: str.indexOf(match.text),
      size: match.text.length,
      text: match.text,
      unit: match.unit,
      unitPos: match.unitPos,
      unitSize: match.unitSize,
      unitText: match.unitText,
      value: match.value,
      quantityPos: match.quantityPos,
      quantitySize: match.quantitySize,
      quantityText: match.quantityText,
      rangePos: match.rangePos ?? [],
      rangeSizes: match.rangeSizes ?? [],
    });
  }
  return values;
}
function splitLines(str) {
  return str.split(/\r?\n/).filter((v) => v.trim().length > 0);
}
function wordToNumber(word) {
  switch (word) {
    case "one":
    case "One":
      return 1;
    case "two":
    case "Two":
      return 2;
    case "three":
    case "Three":
      return 3;
    case "four":
    case "Four":
      return 4;
    case "five":
    case "Five":
      return 5;
    case "six":
    case "Six":
      return 6;
    case "seven":
    case "Seven":
      return 7;
    case "eight":
    case "Eight":
      return 8;
    case "nine":
    case "Nine":
      return 9;
    case "ten":
    case "Ten":
      return 10;
    case "eleven":
    case "Eleven":
      return 11;
    case "twelve":
    case "Twelve":
      return 12;
    case "thirteen":
    case "Thirteen":
      return 13;
    case "fourteen":
    case "Fourteen":
      return 14;
    case "fifteen":
    case "Fifteen":
      return 15;
    case "sixteen":
    case "Sixteen":
      return 16;
    case "seventeen":
    case "Seventeen":
      return 17;
    case "eighteen":
    case "Eighteen":
      return 18;
    case "nineteen":
    case "Nineteen":
      return 19;
    case "twenty":
    case "Twenty":
      return 20;
  }
}
function numberToWord(number) {
  switch (number) {
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    case 4:
      return "Four";
    case 5:
      return "Five";
    case 6:
      return "Six";
    case 7:
      return "Seven";
    case 8:
      return "Eight";
    case 9:
      return "Nine";
    case 10:
      return "Ten";
    case 11:
      return "Eleven";
    case 12:
      return "Twelve";
    case 13:
      return "Thirteen";
    case 14:
      return "Fourteen";
    case 15:
      return "Fifteen";
    case 16:
      return "Sixteen";
    case 17:
      return "Seventeen";
    case 18:
      return "Eighteen";
    case 19:
      return "Nineteen";
    case 20:
      return "Twenty";
  }
}

class Ingredient {
  constructor(str) {
    (this.text = null), (this.decorations = []);

    this.update(str);
  }
  parse = function (str) {
    let decorations = [];
    let sansInstructions = str.split(", ")[0];
    let workingStr = sansInstructions;
    let units = findUnit(sansInstructions);

    if (units) {
      let quantity, deco;

      for (let unit of units) {
        quantity =
          findRange(sansInstructions, unit?.groups?.unit ?? null) ??
          findDeconstructed(sansInstructions, unit?.groups?.unit ?? null) ??
          findSingleQuantity(sansInstructions, unit?.groups?.unit ?? null) ??
          null;
        deco = {
          unit: unit?.groups?.unit ?? null,
          quantity: quantity?.quantity ?? null,
          range: {
            unit: [unit.index, unit.index + unit?.groups?.unit.length ?? 0],
            quantity: quantity.range,
            entire: [quantity.index, quantity.index + quantity.matchLength],
          },
        };
        decorations.push(deco);
        workingStr = workingStr.replace(
          sansInstructions.slice(deco.range.entire[0], deco.range.entire[1]),
          new Array(deco.matchLength)
            .fill(0)
            .map((v) => "_")
            .join("")
        );
      }
    }

    let nonUnitQuantities = [
      ...findNonUnitRange(workingStr),
      ...findNonUnitDeconstructed(workingStr),
      ...findNonUnitSingleQuantity(workingStr),
    ].map((q) => ({
      unit: null,
      quantity: q.groups.quantity,
      range: {
        unit: null,
        quantity: [q.index, q.index + q.groups.quantity.length],
        entire: [q.index, q.index + q.groups.quantity.length],
      },
    }));

    decorations = [...decorations, ...nonUnitQuantities]
      .sort((a, b) => (a.range.entire[0] < b.range.entire[0] ? -1 : 1))
      .map((d) => ({ ...d, quantity: new Quantity(d.quantity) }));

    return decorations;
  };
  update = function (str) {
    this.text = str;
    this.decorations = this.parse(str);

    this.scaled = this.decorations;
  };
  scale = function (factor) {
    this.scaled = this.decorations;
    if (factor === 1 || !this.decorations.length) return this.scaled;

    this.scaled = this.decorations.map((d) => ({
      ...d,
      quantity: d.quantity.scale(factor, true),
    }));

    return this.scaled;
  };
}
class RecipeString {
  constructor(text = "") {
    this.text = text;
    this.decorations = this.parse(text);
    this.scaled = [...this.decorations];
  }
  parse = function (text = "") {
    if (!text || !text.length) return [];

    let decorations = attachPos(text, findUnits(text, findValues(text)))
      .sort((a, b) => (a.pos < b.pos ? -1 : 1))
      .map((q) => new RecipeDeco(q));

    return decorations;
  };
  update = function (str) {
    this.text = str;
    this.decorations = this.parse(str);

    this.scaled = this.decorations;
  };
  scale = function (factor = 1) {
    this.scaled = [...this.decorations];
    if (factor === 1 || !this.decorations.length) return this.scaled;

    this.scaled.forEach((d) => d.scale(factor));

    return this.scaled;
  };
}
class RecipeDeco {
  constructor({
    text = "",
    value = null,
    unit = null,
    pos = 0,
    size = 0,
    quantityType = null,
    quantityPos = 0,
    quantitySize = 0,
    unitPos = 0,
    unitSize = 0,
    quantityText = "",
    unitText = "",
    rangePos = [],
    rangeSizes = [],
  } = {}) {
    this.text = text;
    this.pos = pos;
    this.size = size;
    this.end = pos + size;
    this.unit = unit;
    this.quantityPos = quantityPos;
    this.quantitySize = quantitySize;
    this.quantityText = quantityText;
    this.rangePos = rangePos;
    this.rangeSizes = rangeSizes;
    this.unitPos = unitPos;
    this.unitSize = unitSize;
    this.unitText = unitText;
    this.quantity = new Quantity({ value, quantityType });
  }
  scale(factor) {
    this.quantity.scale(factor);
  }
  toString() {
    let start = this.quantityPos;
    let end = start + this.quantitySize;
    let isRange = this.quantity.type === quantityTypes.range;
    let joinStr = isRange
      ? this.text.slice(this.rangePos[0] + this.rangeSizes[0], this.rangePos[1])
      : "";
    let replaceStr = this.quantity.toString(joinStr);
    return (
      this.text.slice(0, start) +
      replaceStr +
      this.text.slice(end)
    ).replace(/\s/g, "&nbsp;");
  }
}
class Quantity {
  constructor({ value = 0, quantityType = "" } = {}) {
    this._value = 0;

    this.type = quantityType ?? this.getType(value);

    this._scale = 1;

    this.value = { value, quantityType };
  }
  get value() {
    switch (this.type) {
      default:
      case quantityTypes.number:
      case quantityTypes.string:
        return this._value * this._scale;
      case quantityTypes.fraction:
        return this._value.mul(this._scale).valueOf();
      case quantityTypes.range:
      case quantityTypes.deconstructed:
        return this._value.map((v, i) =>
          this.type === quantityTypes.range || !i ? v.value : v._value
        );
    }
  }
  set value(input) {
    let value = input?.value ?? input;
    this.type = input?.quantityType ?? input?.type ?? this.getType(input);

    this._value =
      this.type === quantityTypes.range ||
      this.type === quantityTypes.deconstructed
        ? value.map((v) => new Quantity(v))
        : this.type === quantityTypes.number
        ? +value
        : this.type === quantityTypes.fraction
        ? new Fraction(value)
        : wordToNumber(value); // word to number;
  }
  getType = function (value = this.value) {
    if (!value) return null;
    if (Array.isArray(value)) return quantityTypes.range;
    if (value.toFraction || (typeof value === "string" && value.includes("/")))
      return quantityTypes.fraction;
    if (value.includes(" ")) return quantityTypes.deconstructed;
    if (!isNaN(+value)) return quantityTypes.number;
    return quantityTypes.string;
  };
  scale = function (fac = 1) {
    this._scale = fac;

    if (
      this.type === quantityTypes.range ||
      this.type === quantityTypes.deconstructed
    ) {
      let i = 0;
      for (let val of this._value) {
        (this.type === quantityTypes.range || !i) && val.scale(fac);
        i++;
      }
    }
  };
  // scale = function (scale, toString = false) {
  //   let multiplied;
  //   switch (this.type) {
  //     default:
  //     case quantityTypes.number:
  //     case quantityTypes.string:
  //       multiplied = this._value * scale;
  //       break;
  //     case quantityTypes.fraction:
  //       multiplied = this._value.mul(scale);
  //       break;
  //     case quantityTypes.deconstructed:
  //       multiplied = this._value.map((v, i) => (i === 0 ? v.scale(scale) : v));
  //       break;
  //     case quantityTypes.range:
  //       multiplied = this._value.map((v) => v.scale(scale));
  //       break;
  //   }
  //   this._value = multiplied;
  //   return this.value;
  // };
  toString = function (joinStr) {
    let value = this.value;
    switch (this.type) {
      default:
      case quantityTypes.string:
        return numberToWord(value);
      case quantityTypes.number:
        return value.toString();
      case quantityTypes.deconstructed:
        return this._value.map((v) => v.toString(joinStr)).join(" ");
      case quantityTypes.fraction:
        return new Fraction(value).toFraction(true);
      case quantityTypes.range:
        return this._value.map((v) => v.toString()).join(joinStr);
    }
  };
}

const quantityTypes = {
  FLOAT: "FLOAT",
  INTEGER: "INTEGER",
  NUMBER: "NUMBER",
  RANGE: "RANGE",
  DECONSTRUCTED: "DECONSTRUCTED",
  FRACTION: "FRACTION",
  STRING: "STRING",
  float: "FLOAT",
  integer: "INTEGER",
  number: "NUMBER",
  range: "RANGE",
  deconstructed: "DECONSTRUCTED",
  fraction: "FRACTION",
  string: "STRING",
};
