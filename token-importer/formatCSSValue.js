import calculate from "./calculate.js";
import config from "./config.js";
import convertHex from "./convertHex.js";
import figmaTokens from "./getFigmaTokens.js";
import getRefVarKey from "./getRefVarKey.js";
import isMathValue from "./isMathValue.js";
import isRefValue from "./isRefValue.js";
import numberToRem from "./numberToRem.js";

export default function formatCSSValue(varType, { $value, $type }) {
  switch ($type) {
    case "color":
      return getColorValue($value);
    case "string":
      return getStringValue($value);
    case "number":
      return varType === 'fontWeight'
        ? isRefValue($value)
          ? `var(--${getRefVarKey($value)})`
          : $value
        : getSpaceValue($value);
  }
  return $value;
}

function getColorValue(value) {
  const val = isRefValue(value)
    ? `var(--${getRefVarKey(value)})`
    : isRGBAValue(value)
    ? value
    : prepareColourValue(value);
  return val;
}
function getStringValue(value) {
  const val = isRefValue(value)
    ? `var(--${getRefVarKey(value)})`
    : value;
  return val;
}

function getSpaceValue(value) {
  return isMathValue(value)
  ? `${numberToRem(calculate(value, figmaTokens))}rem`
  : isRefValue(value)
    ? `var(--${getRefVarKey(value)})`
    : value >= 1
      ? `${numberToRem(value)}rem`
      : `calc(${value.toFixed(2)}/16 * 1rem)`;
}


export function isRGBAValue (value) {
  return value.includes('rgba(');
}

function prepareColourValue(value) {
    const converterFn = convertHex[config.colorSpace ?? 'rgb']
    if (!converterFn) {
      throw new Error(`Unsupported color space: ${config.colorSpace}`)
    }
    return converterFn(value);
}