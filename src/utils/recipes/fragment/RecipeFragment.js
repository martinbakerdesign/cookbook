import Fraction from "fraction.js";
import QuantityDeco from "utils/prosemirror/recipe/QuantityDecoration";
import quantityTypes from "data/quantity/_types";
import unitRegexp from "utils/units/unitExpression";
import cleanUpText from "utils/text/cleanUpText";
import wordToNumber from "utils/text/wordToNumber";
import replaceSlice from "utils/text/replaceSlice";
import { stubString } from "lodash";

const regExpAtoms = {
  range: "\\s?(?:to|-)\\s?",
  fraction: "(?:\\d+\\s)?\\d+/\\d+",
  decimal: "\\d+\\.\\d+",
  float: "\\d+\\.\\d+",
  digit: "\\d+",
  int: "\\d+",
  number: "(?:\\d+\\.)?\\d+",
  numberStrings: [
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

// Improve detection of deconstructed vs fractions
// Current method cannot correctly determine if 1 1/2 is a fraction
// or a deconstructed value
// Hence, the only way to write parseable deconstructed quantities
// is to write the quantity as a text value and not a number
// I am happy to go along with this because I think it forces
// clearer (and therefore arguably, better) recipe writing

const regExpressions = {
  isRange: new RegExp(`\\d(?:${regExpAtoms.range})\\d`),
  // unit: new RegExp(`(?<=\\d[\\s-]?)(?<unit>${unitRegexp})(?!\\w)`, "g"),
  // deconstructed: new RegExp(
  //   `((?<quantity>(?<range1>(?:(?:\\d+\\s)?\\d+\\/\\d+)|(?:\\d+\\.\\d+)|(?:\\d+)|(?:${regExpAtoms.numberStrings.join(
  //     "|"
  //   )}}))(?:\\s?(?:to|-)\\s?)(?<range2>(?:(?:\\d+\\s)?\\d+\\/\\d+)|(?:\\d+\\.\\d+)|(?:\\d+)|(?:${regExpAtoms.numberStrings.join(
  //     "|"
  //   )}})))\\s\\(?(?<quantified>\\d+))`,
  //   "g"
  // ),
  // deconstructed: new RegExp(
  //   `((?<quantity>(?:(?<range1>(?:${regExpAtoms.fraction})|(?:${
  //     regExpAtoms.number
  //   }))(?<rangejoining>${regExpAtoms.range})(?<range2>(?:${
  //     regExpAtoms.fraction
  //   })|(?:${regExpAtoms.number})|(?:${regExpAtoms.numberStrings.join(
  //     "|"
  //   )})))|(?:${regExpAtoms.fraction})|(?:${
  //     regExpAtoms.number
  //   }))[x*]?\\s\\(?(?<quantified>(?:${regExpAtoms.fraction})|(?:${
  //     regExpAtoms.number
  //   })|(?:${regExpAtoms.numberStrings.join("|")})))`,
  //   "g"
  // ),
  // deconstructed: new RegExp(
  //   `\\b((?<quantity>${regExpAtoms.numberStrings.join(
  //     "|"
  //   )})[x*]?\\s\\(?(?<quantified>(?:${regExpAtoms.fraction})|(?:${
  //     regExpAtoms.number
  //   })|(?:${regExpAtoms.numberStrings.join("|")})))`,
  //   "g"
  // ),
  deconstructed: new RegExp(
    `\\b(?<quantity>(?:${regExpAtoms.numberStrings.join("|")})|(?:${
      regExpAtoms.fraction
    })|(?:${
      regExpAtoms.number
    }))\\s\\((?<quantified>(?:${regExpAtoms.numberStrings.join("|")})|(?:${
      regExpAtoms.fraction
    })|(?:${regExpAtoms.number}))[^\\)\\n\\r]+\\)`,
    "g"
  ),
  range: new RegExp(
    `(?<quantity>(?<range1>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.decimal})|(?:${regExpAtoms.digit}))(?:${regExpAtoms.range})(?<range2>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.number})))`,
    "g"
  ),
  number: new RegExp(`(?<quantity>${regExpAtoms.number})(?:[\\s\-])?`, "g"),
  numberStrings: new RegExp(
    `\\b(?<quantity>${regExpAtoms.numberStrings.join("|")})\\b`,
    "g"
  ),
  fraction: new RegExp(`(?<quantity>${regExpAtoms.fraction})`, "g"),
  valuedUnit: (valueStr) =>
    new RegExp(`(?<quantity>${valueStr})[\\s\-]?(?<unit>${unitRegexp})(?!\\w)`),
  unitRange: (unitStr) =>
    new RegExp(
      `(?<quantity>(?<range1>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.number}))(?:${regExpAtoms.range})(?<range2>(?:${regExpAtoms.fraction})|(?:${regExpAtoms.number})))[\\s\-]?${unitStr}`
    ),
  unitDeconstructed: (unitStr) =>
    new RegExp(
      `((?<quantity>(?:(?<range1>(?:${regExpAtoms.fraction})|(?:${
        regExpAtoms.decimal
      })|(?:${regExpAtoms.digit}))(?:${regExpAtoms.range})(?<range2>(?:${
        regExpAtoms.fraction
      })|(?:${regExpAtoms.number})|(?:${regExpAtoms.join("|")})))|(?:${
        regExpAtoms.fraction
      })|(?:${regExpAtoms.number}))[x*]?\\s\\(?(?<quantified>(?:${
        regExpAtoms.number
      })|(?:${regExpAtoms.numberStrings.join("|")})))[\\s\-]?${unitStr}`
    ),
  stringNumbers: new RegExp(`${regExpAtoms.numberStrings.join("|")}`, "g"),
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

class RecipeFragment {
  constructor(text = "", startPos = 0) {
    this.startPos = startPos;
    this._text = cleanUpText(text);
    this.decorations = this.parse(this._text, startPos);
    this.scaled = this.decorations.map((d) => d.toString());
  }
  get text() {
    if (!this.decorations.length) return this._text;
    let scaledText = replaceSlices(this._text, this.decorations, this.scaled);

    return scaledText;
  }
  parse(text = "", startPos = 0) {
    if (!text || !text.length) return [];

    let decorations = attachPos(startPos, findUnits(text, findValues(text)))
      .sort((a, b) => (a.pos < b.pos ? -1 : 1))
      .map((q) => new QuantityDeco(q));

    return decorations;
  }
  update(str) {
    this._text = str;
    this.decorations = this.parse(str);

    this.scaled = this.decorations.map((d) => d.scale(1));
  }
  scale(factor = 1) {
    this.scaled = this.decorations.map((d) => d.toString(factor));

    return this.text;
  }
}

export default RecipeFragment;

function attachPos(startPos = 0, matches) {
  let values = [];

  for (let match of matches) {
    values.push({
      quantityType: match.quantityType,
      // pos: startPos + str.indexOf(match.text),
      pos: startPos + match.pos,
      size: match.text.length,
      text: match.text,
      unit: match.unit,
      unitPos: match.unitPos != null ? match.unitPos : null,
      unitSize: match.unitSize,
      unitText: match.unitText,
      value: match.value,
      quantityPos: match.quantityPos != null ? match.quantityPos : null,
      quantitySize: match.quantitySize,
      quantityText: match.quantityText,
      rangePos: match.rangePos ?? [],
      rangeSizes: match.rangeSizes ?? [],
    });
  }
  return values;
}
function findUnits(str, srcValues) {
  let values = [];
  let unitValue;

  for (let value of srcValues.sort((a, b) => (a.pos < b.pos ? -1 : 1))) {
    unitValue = findValuedUnit(str, value);
    values.push(unitValue);
  }

  return values;
}
function findValuedUnit(str, value) {
  let isDeconstructed = value.quantityType === quantityTypes.deconstructed;
  let strOffset = isDeconstructed ? value.rangePos[1] : 0;
  let sliceStart = value.pos + strOffset;
  let slicedStr = str.slice(sliceStart);
  let valueText = !isDeconstructed
    ? value.text
    : value.text.slice(strOffset, strOffset + value.rangeSizes[1]);
  let exp = regExpressions.valuedUnit(valueText);
  let match = slicedStr.match(exp);

  let valuedUnit =
    match && !match.index
      ? {
          ...value,
          unitPos: strOffset + match[0].indexOf(match.groups.unit),
          unitSize: match.groups.unit.length,
          unitText: match.groups.unit,
          unit: match.groups.unit,
          text: !isDeconstructed ? match[0] : value.text,
        }
      : value;

  return valuedUnit;
}
function findValues(str) {
  let values = [];
  let deconstructed = findDeconstructeds(str);
  let ranges = findRanges(deconstructed[1]);
  let fractions = findFractions(ranges[1]);
  let numbers = findNumbers(fractions[1]);
  let strings = findNumberStrings(fractions[1]);

  deconstructed[0] && (values = [...values, ...deconstructed[0]]);
  ranges[0] && (values = [...values, ...ranges[0]]);
  fractions[0] && (values = [...values, ...fractions[0]]);
  numbers[0] && (values = [...values, ...numbers[0]]);
  strings[0] && (values = [...values, ...strings[0]]);

  return values;
}
function findQuantity(str, quantityType, exp) {
  let workingStr = str;
  let matches = [...workingStr.matchAll(exp)];
  let hasMatches = matches.length > 0;
  let m = 0;
  let prevSizes, start, text;
  let matchTexts = matches.map((m) =>
    quantityType !== quantityTypes.deconstructed
      ? m.groups.quantity
      : m[0].trim()
  );

  for (let match of matches) {
    text = matchTexts[m];
    prevSizes = !m
      ? 0
      : matchTexts.filter((v, i) => i < m).reduce((p, c) => p + c.length, 0);
    start = match.index - prevSizes;
    workingStr = replaceSlice(
      workingStr,
      start,
      start + match[0].length,
      new Array(match[0].length)
        .fill(" ")
        .map(() => " ")
        .join("")
    );
    m++;
  }
  let isRange = quantityType === quantityTypes.RANGE;

  return [
    hasMatches &&
      matches.map((m, i) => ({
        quantityType,
        pos: m.index,
        text: matchTexts[i],
        // quantityPos: m.index,
        quantityText: matchTexts[i],
        quantitySize: matchTexts[i].length,
        ...([quantityTypes.DECONSTRUCTED, quantityTypes.RANGE].includes(
          quantityType
        ) && getRangeProps(m, isRange)),
        value: getValue(m, quantityType),
        ...(m.groups && { groups: m.groups }),
      })),
    workingStr,
  ];
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
function findNumberStrings(str) {
  return findQuantity(str, quantityTypes.string, regExpressions.numberStrings);
}
function getValue(match, quantityType) {
  switch (quantityType) {
    default:
    case quantityTypes.integer:
    case quantityTypes.float:
    case quantityTypes.number:
      return +match.groups.quantity;
    case quantityTypes.string:
      return match.groups.quantity;
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
function replaceSlices(text, decorations, scaledStrings) {
  let slices = [];
  let before,
    after,
    lastSlice = 0,
    nextSlice;
  let d = 0;
  for (let deco of decorations) {
    nextSlice = decorations[d + 1] ?? null;
    if (!d) {
      before = text.slice(0, deco.pos);
      slices.push(before);
    }
    slices.push(scaledStrings[d]);
    after =
      nextSlice != null
        ? text.slice(deco.end, nextSlice.pos)
        : text.slice(deco.end);
    slices.push(after);
    lastSlice = deco.end;
    d++;
  }

  return slices.join("");
}
function getRangeProps(match, isRange) {
  let text = match[0];
  let rangePos = [];
  let rangeSizes = [];
  let groups = [
    isRange ? "range1" : "quantity",
    isRange ? "range2" : "quantified",
  ];
  let subString, pos;

  for (let group of groups) {
    subString = match.groups[group];
    pos = text.indexOf(subString) + rangeSizes.reduce((p, c) => p + c, 0);
    rangePos.push(pos);
    rangeSizes.push(subString.length);
    text = text.slice(pos + subString.length);
  }

  return {
    rangePos,
    rangeSizes,
  };
}
