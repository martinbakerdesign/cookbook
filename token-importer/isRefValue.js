import isMathValue from "./isMathValue.js";

export default function isRefValue (value = '') {
    const hasRef = value && value.length > 0 && value.trim().slice(0,1) === '{' && value.trim().slice(-1) === '}';
    return hasRef && !isMathValue(value);
}