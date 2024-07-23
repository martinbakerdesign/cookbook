import config from "./config.js";
import convertHex from "./convertHex.js";
import isRefValue from "./isRefValue.js";
import numberToRem from "./numberToRem.js";
import removeDefaultFromPath from "./removeDefaultFromPath.js";

export default function formatCSSValue(varType, { $value, $type }) {
  switch ($type) {
    case "color":
      return getColorValue($value);
    case "number":
      return varType === 'fontWeight' ? $value : getSpaceValue($value);
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

function getRefVarKey(value) {
  const fullPath = value.replace(/[{}]/g, "").split(".");

  return removeDefaultFromPath(fullPath).join("-");
}

function prepareColourValue(value) {
    const converterFn = convertHex[config.colorSpace ?? 'rgb']
    if (!converterFn) {
        throw new Error(`Unsupported color space: ${config.colorSpace}`)
    }
    return converterFn(value);
}