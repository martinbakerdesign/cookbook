import config from "./config.js";
import convertHex from "./convertHex.js";
import getRefVarKey from "./getRefVarKey.js";
import isRefValue from "./isRefValue.js";
import numberToRem from "./numberToRem.js";

export default function formatCSSValue(varType, { $value, $type }) {
  switch ($type) {
    case "color":
      return getColorValue($value);
    case "number":
      return varType === 'fontWeight'
        ? isRefValue($value)
          ? `var(--${getRefVarKey($value)})`
          : $value
        : getSpaceValue($value);
  }
}

function getColorValue(value) {
  const val = isRefValue(value)
    ? `var(--${getRefVarKey(value)})`
    : prepareColourValue(value);
  return val;
}

function getSpaceValue(value) {
  return isRefValue(value)
    ? `var(--${getRefVarKey(value)})`
    : value >= 1
      ? `${numberToRem(value)}rem`
      : `calc(${value.toFixed(2)}/16 * 1rem)`;
}



function prepareColourValue(value) {
    const converterFn = convertHex[config.colorSpace ?? 'rgb']
    if (!converterFn) {
        throw new Error(`Unsupported color space: ${config.colorSpace}`)
    }
    return converterFn(value);
}