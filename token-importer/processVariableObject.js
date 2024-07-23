import propFormatters from "./propFormatters.js";

export function processVariableObject(
  cssStyles,
  tailwindConfig,
  varType,
  obj = {},
  currentPath = [],
  tokenLevel = "base"
) {
  const { modes, ...rest } = obj;

  if (modes) {
    for (const [mode, vars] of Object.entries(modes)) {
      processModeVariableObject(
        cssStyles,
        tailwindConfig,
        mode,
        varType,
        vars,
        []
      );
    }
  }
  for (const [key, value] of Object.entries(rest)) {
    const fullPath = [...currentPath, key];
    if (typeof value === "object" && value !== null) {
      if ("$value" in value) {
        const formatter = propFormatters[varType];

        formatter?.setCSSValue(cssStyles, fullPath, value, null);
        formatter?.setTailwindValue(
          tailwindConfig,
          fullPath,
          value,
          tokenLevel
        );
      } else {
        processVariableObject(
          cssStyles,
          tailwindConfig,
          varType,
          value,
          fullPath,
          tokenLevel
        );
      }
    }
  }
}

export function processModeVariableObject(
  cssStyles,
  tailwindConfig,
  mode,
  varType,
  obj = {},
  currentPath = []
) {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = [...currentPath, key];
    if (typeof value === "object" && value !== null) {
      if ("$value" in value) {
        const formatter = propFormatters[varType];

        formatter?.setCSSValue(cssStyles, fullPath, value, mode);
        formatter?.setTailwindValue(tailwindConfig, fullPath, value);
      } else {
        processModeVariableObject(
          cssStyles,
          tailwindConfig,
          mode,
          varType,
          value,
          fullPath
        );
      }
    }
  }
}

export default {
  variable: processVariableObject,
  modeVariable: processModeVariableObject,
};
