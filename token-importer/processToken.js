import propFormatters from "./propFormatters.js";

export default function processToken(
  cssStyles,
  tailwindConfig,
  varType,
  obj = {},
  currentPath = [],
  opts
) {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = [...currentPath, key];
    if (typeof value === "object" && value !== null) {
      if ("$value" in value) {
        const formatter = propFormatters[varType];

        formatter?.setCSSValue(cssStyles, fullPath, value, opts);
        formatter?.setTailwindValue(
          tailwindConfig,
          fullPath,
          value,
          opts
        );
      } else {
        processToken(
          cssStyles,
          tailwindConfig,
          varType,
          value,
          fullPath,
          opts
        );
      }
    }
  }
}