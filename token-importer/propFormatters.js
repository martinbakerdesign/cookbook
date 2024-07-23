import isRefValue from "./isRefValue.js";
import tailwindKeys from "./tailwindKeys.js";
import removeDefaultFromPath from './removeDefaultFromPath.js'
import formatCSSValue from './formatCSSValue.js'

class PropFormatter {
  constructor(key) {
    this.key = key;

    this.setTailwindValue = tailwindValueSetterFactory(this);
  }
  getCSSVarName = (path = []) => {
    return removeDefaultFromPath([path[0] !== this.key ? this.key : null, ...path])
      .filter((v) => null != v)
      .join("-");
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
  /**
   * 
   * @param {*} tailwindConfig 
   * @param {*} path 
   * @returns {Object|undefined}
   */
  getTailwindConfigRef = (tailwindConfig, path) => {
    let ref = tailwindConfig;
    for (const pathPart of [
      this.key === "color" ? "colors" : this.key,
      ...path,
    ].slice(0, -1)) {
      if (!ref[pathPart]) {
        ref[pathPart] = {};
      }
      ref = ref[pathPart];
    }
    return ref;
  };
}

const propFormatters = getPropFormatters(tailwindKeys.all);

export default propFormatters;

function tailwindValueSetterFactory(ctx) {
  const tailwindValueSetters = {
    default: (ctx) => {
      return (
        tailwindConfig = {},
        path = [],
        { $value, $type },
        tokenLevel = "base"
      ) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        if (!ref) return tailwindConfig;

        const $key = path.slice(-1).join('-');
        if ("color" === $type) {
          ref[$key] = `rgb(var(--${ctx.getCSSVarName(path)}) / <alpha-value>)`;
        } else if (tailwindKeys.number.includes(ctx.key)) {
          ref[$key] = `var(--${ctx.getCSSVarName(
            isRefValue($value) && tokenLevel === "base"
              ? $value.replace(/[{}]/g, "").split(".")
              : path
          )})`;
        }

        return tailwindConfig;
      };
    },
    color: (ctx) => {
      return (tailwindConfig = {}, path = []) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        if (!ref) return tailwindConfig;

        const $key = path.slice(-1).join('-');
        const cssVarName = ctx.getCSSVarName(path);
        ref[$key] = `rgb(var(--${cssVarName}) / <alpha-value>)`;

        return tailwindConfig;
      };
    },
    spacing: (ctx) => {
      return (
        tailwindConfig = {},
        path = [],
        { $value, $type },
        tokenLevel = "base"
      ) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        if (!ref) return tailwindConfig;

        const $key = path.slice(-1).join('-');
        const cssVarName = ctx.getCSSVarName(
          isRefValue($value) && tokenLevel === "base"
            ? $value.replace(/[{}]/g, "").split(".")
            : path
        );
        ref[$key] = `var(--${cssVarName})`;

        return tailwindConfig;
      };
    },
    radius: (ctx) => {
      return (tailwindConfig = {}, path = []) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        if (!ref) return tailwindConfig;

        const $key = path.slice(-1).join('-');
        const cssVarName = ctx.getCSSVarName(path);

        ref[$key] = `var(--${cssVarName})`;

        return tailwindConfig;
      };
    },
  };
  if (tailwindKeys.color.includes(ctx.key)) {
    return tailwindValueSetters.color(ctx);
  } else if (tailwindKeys.radius.includes(ctx.key)) {
    return tailwindValueSetters.radius(ctx);
  } else if (tailwindKeys.number.includes(ctx.key)) {
    return tailwindValueSetters.spacing(ctx);
  }
  return tailwindValueSetters.default(ctx);
}

function getPropFormatters(keys = []) {
  const propFormatters = {};

  for (const key of keys) {
    propFormatters[key] = new PropFormatter(key);
  }

  return propFormatters;
}