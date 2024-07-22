// CSS Variables are the single source of truth
// Incorporate tailwind to add some magic

import fs from "fs";

const colorSpace = "rgb";

const rootFontSizePx = 16;

const cssStyles = {
  root: {},
  modes: {},
};

const figmaVariables = JSON.parse(
  fs.readFileSync("./figmaVariables.json", "utf8")
);

const tailwindConfig = {
  colors: {
    transparent: "transparent",
    current: "currentColor",
  },
};

const spacePropKeys = [
  "spacing",
  "padding",
  "gap",
  "space",
  "margin",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "radius",
];

const colorPropKeys = ['colors', 'color', 'borderColor', 'background', 'backgroundColor', 'fill', 'stroke', 'ringColor', 'textColor', 'accentColor', 'caretColor', 'divideColor', 'outlineColor', 'boxShadowColor', 'ringOffsetColor', 'placeholderColor', 'textDecorationColor'];

const textPropKeys = ["fontSize", "lineHeight", "letterSpacing", "fontWeight"];

const numberPropKeys = [...spacePropKeys, ...textPropKeys];

class PropFormatter {
  constructor(key) {
    this.key = key;

    this.setTailwindValue = tailwindValueSetterFactory(this);
  }
  getCSSVarName = (path = []) => {
    return removeDefault([(path[0] !== this.key ? this.key : null), ...path]).filter(v => null != v).join("-");
  };
  setCSSValue = (cssStyles = {}, path = [], value, mode = null) => {
    if (!cssStyles || !path || !path.length || null == value) return;

    const cssValue = formatCSSValue(this.key, value);
    
    const varName = this.getCSSVarName(path);
    if (mode && !cssStyles.modes[mode]) {
      cssStyles.modes[mode] = {};
    }
    if (null == mode) {
      cssStyles.root[varName] = cssValue;
    } else {
      cssStyles.modes[mode][varName] = cssValue;
    }

    return cssStyles;
  };
  getTailwindConfigRef = (tailwindConfig, path) => {
    let ref = tailwindConfig;
    for (const pathPart of [this.key === 'color' ? 'colors' : this.key, ...path].slice(0, -1)) {
      if (!ref[pathPart]) {
        ref[pathPart] = {};
      }
      ref = ref[pathPart];
    }
    return ref;
  }
}

const propFormatters = getPropFormatters([...colorPropKeys, ...numberPropKeys]);

for (const tokenLevel of ['base', 'abstract', 'component']) {
  Object.entries(figmaVariables[tokenLevel] ?? {}).forEach(([varType, vars]) => {
    processObject(varType, vars, [], tokenLevel);
  });
}

outputVariableFiles();

function outputVariableFiles () {
  generateCSSFile();
  generateTailwindVariablesFile();
}

function processObject(varType, obj = {}, currentPath = [], tokenLevel = 'base') {
  const { modes, ...rest } = obj;

  if (modes) {
    for (const [mode, vars] of Object.entries(modes)) {
      processModeObject(mode, varType, vars, []);
    }
  }
  for (const [key, value] of Object.entries(rest)) {
    const fullPath = [...currentPath, key];
    if (typeof value === "object" && value !== null) {
      if ("$value" in value) {
        const formatter = propFormatters[varType];

        formatter?.setCSSValue(cssStyles, fullPath, value, null);
        formatter?.setTailwindValue(tailwindConfig, fullPath, value, tokenLevel);
      } else {
        processObject(varType, value, fullPath, tokenLevel);
      }
    }
  }
}

function processModeObject(mode, varType, obj = {}, currentPath = []) {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = [...currentPath, key];
    if (typeof value === "object" && value !== null) {
      if ("$value" in value) {
        const formatter = propFormatters[varType];

        formatter?.setCSSValue(cssStyles, fullPath, value, mode);
        formatter?.setTailwindValue(tailwindConfig, fullPath, value);
      } else {
        processModeObject(mode, varType, value, fullPath);
      }
    }
  }
}

function removeDefault(path) {
  const lastIndex = path.length - 1;
  return path.filter((v, i) => i !== lastIndex || v !== "DEFAULT");
}

function formatCSSValue(varType, { $value, $type }) {
  const tokenLevel = "base";
  switch ($type) {
    case "color":
      return getColorValue($value);
    case "number":
      return getSpaceValue(varType, $value);
  }
}

function getColorValue(value) {
  const val = isRef(value)
    ? `var(--${getRefVarKey(value)})`
    : prepareColourValue(value);
  return val;
}

function getSpaceValue(varType, value) {
  const doNothingKeys = ["fontWeight"];
  return isRef(value)
    ? `var(--${getRefVarKey(value)})`
    : doNothingKeys.includes(varType)
      ? value
      : value >= 1
        ? `${numberToRem(value)}rem`
        : `calc(${value.toFixed(2)}/16 * 1rem)`;
}

function getRefVarKey(value) {
  const fullPath = value.replace(/[{}]/g, "").split(".");

  return removeDefault(fullPath).join("-");
}

function prepareColourValue(value) {
  switch (colorSpace) {
    case "hsl":
      return hexToHSL(value);
    case "rgb":
    default:
      return hexToRGB(value);
  }
}

function hexToHSL(hex) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB
  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l].join(" ");
}

function hexToRGB(hex) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  // Return the RGB values as a string
  return [r, g, b].join(" ");
}

function isRef(value) {
  return value && value.length > 0 && value.slice(0, 1) === "{";
}

function numberToRem(num) {
  return num / rootFontSizePx;
}

function generateTailwindVariablesFile() {
  // Export tailwindConfig to figmaVars.js
  fs.writeFileSync(
    "./figmaVariables.js",
    `const figmaVariables = ${JSON.stringify(tailwindConfig, null, 2)};
    
    export default figmaVariables;`
  );
}

function generateCSSFile() {
  // Generate CSS content
  let cssContent = "@tailwind base;\n@layer base {\n";
  cssContent += "  :root {\n";
  cssContent += "    font-size: 16px;\n";
  for (const [key, value] of Object.entries(cssStyles.root)) {
    cssContent += `    --${key}: ${value};\n`;
  }
  cssContent += "  }\n\n";

  for (const [mode, styles] of Object.entries(cssStyles.modes)) {
    cssContent += `  .${mode} {\n`;
    for (const [key, value] of Object.entries(styles)) {
      cssContent += `    --${key}: ${value};\n`;
    }
    cssContent += "  }\n\n";
  }
  cssContent += "}";

  // Write CSS content to file
  fs.writeFileSync("./src/styles/variables.css", cssContent);
}

function tailwindValueSetterFactory (ctx) {
  const tailwindValueSetters = {
    default: (ctx) => {
      return (tailwindConfig = {}, path = [], { $value, $type }, tokenLevel = 'base') => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);
  
        const $key = path.slice(-1);
        if ("color" === $type) {
          ref[$key] = `rgb(var(--${ctx.getCSSVarName(path)}) / <alpha-value>)`;
        } else if (numberPropKeys.includes(ctx.key)) {
          ref[$key] = `var(--${ctx.getCSSVarName(
            (isRef($value) && tokenLevel === 'base')
              ? $value.replace(/[{}]/g, "").split(".")
              : path
          )})`;
        }
  
        return tailwindConfig;
      }
    },
    color: (ctx) => {
      return (tailwindConfig = {}, path = []) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        const $key = path.slice(-1);
        const cssVarName = ctx.getCSSVarName(path);
        ref[$key] = `rgb(var(--${cssVarName}) / <alpha-value>)`;

        return tailwindConfig;
      };
    },
    spacing: (ctx) => {
      return (tailwindConfig = {}, path = [], { $value, $type }, tokenLevel = 'base') => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        const $key = path.slice(-1);
        const cssVarName = ctx.getCSSVarName(
          (isRef($value) && tokenLevel === 'base')
            ? $value.replace(/[{}]/g, "").split(".")
            : path
        );
        ref[$key] = `var(--${cssVarName})`;
  
        return tailwindConfig;
      }
    },
    radius: (ctx) => {
      return (tailwindConfig = {}, path = []) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        const $key = path.slice(-1);
        const cssVarName = ctx.getCSSVarName(path);

        ref[$key] = `var(--${cssVarName})`;
    
        return tailwindConfig;
      }
    }
  }
  if (colorPropKeys.includes(ctx.key)) {
    return tailwindValueSetters.color(ctx);
  } else if (ctx.key === 'radius') {
    return tailwindValueSetters.radius(ctx);
  } else if (numberPropKeys.includes(ctx.key)) {
    return tailwindValueSetters.spacing(ctx);
  }
  return tailwindValueSetters.default(ctx);
}

function getPropFormatters(keys = []) {
  const propFormatters = {};

  for (const key of keys) {
    propFormatters[key] = new PropFormatter(key);
  }

  return propFormatters
}