import config from "./config.js";

export default function numberToRem(num) {
    return num / (config?.rootFontSizePx ?? 16);
  }