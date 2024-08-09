import isRefValue from "./isRefValue.js";
import tailwindKeys from "./tailwindKeys.js";
import removeDefaultFromPath from "./removeDefaultFromPath.js";
import formatCSSValue from "./formatCSSValue.js";
import tokenToTailwindMappings from "./tokenToTailwindMappings.js";
import getRefVarKey from "./getRefVarKey.js";

class PropFormatter {
  constructor(key) {
    this.key = key;

    this.tailwindKey = tokenToTailwindMappings[key] ?? key;

    this.setCSSValue = cssValueSetterFactory(this);
    this.setTailwindValue = tailwindValueSetterFactory(this);
  }
  getCSSVarName = (path = [], omitPropKey = false) => {
    return removeDefaultFromPath([
      path[0] !== this.tailwindKey && !omitPropKey ? this.tailwindKey : null,
      ...path,
    ])
      .filter((v) => null != v)
      .join("-");
  };
  /**
   *
   * @param {*} tailwindConfig
   * @param {*} path
   * @returns {Object|undefined}
   */
  getTailwindConfigRef = (tailwindConfig, path, includeTailwindKey = true) => {
    let ref = tailwindConfig;
    const tailwindKey = includeTailwindKey
      ? this.tailwindKey === "color"
        ? "colors"
        : this.tailwindKey
      : null;
    const fullPath = [tailwindKey, ...path].filter(v => null != v);
    for (const pathPart of fullPath.slice(0, -1)) {
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

        const $key = path.slice(-1).join("-");
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
      return (tailwindConfig = {}, path = [], value, mode = null) => {
        const ref = ctx.getTailwindConfigRef(tailwindConfig, path);

        if (!ref) return tailwindConfig;
        const $key = path.slice(-1).join("-");

        const cssVarName = ctx.getCSSVarName(path);
        const isAlpha = path.includes('alpha');
        ref[$key] = !isAlpha ? `rgb(var(--${cssVarName}) / <alpha-value>)` : `var(--${cssVarName})`

        return tailwindConfig;
      };
    },
    spacing: (ctx) => {
      return (
        tailwindConfig = {},
        path = [],
        { $value, $type },
        mode = null
      ) => {
        const tailwindKeyPath = getTailwindKeyPath(ctx.key, path)
        const ref = ctx.getTailwindConfigRef(
          tailwindConfig,
          tailwindKeyPath
        );

        if (!ref) return tailwindConfig;

        const $key = tailwindKeyPath.slice(-1).join("");

        const isMode = null != mode;

        const valueIsRef = isRefValue($value);
        const omitPropKey = !mode && valueIsRef;

        const cssVarName = ctx.getCSSVarName(
          isMode
            ? path
            : isRefValue($value)
              ? $value.replace(/[{}]/g, "").split(".")
              : tailwindKeyPath,
          omitPropKey
        );
        ref[$key] = `var(--${cssVarName})`;

        return tailwindConfig;
      };
    },
    inheritSpacing: (ctx) => {
      return (
        tailwindConfig = {},
        path = [],
        { $value, $type },
        mode = null
      ) => {
        const tailwindKeyPath = getTailwindKeyPath(ctx.key, path);
        const ref = ctx.getTailwindConfigRef(
          tailwindConfig,
          tailwindKeyPath
        );

        if (!ref) return tailwindConfig;

        const $key = tailwindKeyPath.slice(-1).join("");

        const isMode = null != mode;

        const valueIsRef = isRefValue($value);
        const omitPropKey = !mode && valueIsRef;

        const cssVarName = ctx.getCSSVarName(
          isMode
            ? path
            : isRefValue($value)
              ? $value.replace(/[{}]/g, "").split(".")
              : tailwindKeyPath,
            omitPropKey
        );
        ref[$key] = `var(--${cssVarName})`;

        return tailwindConfig;
      };
    },
    radius: (ctx) => {
      return (tailwindConfig = {}, path = []) => {
        const tailwindKeyPath = getTailwindKeyPath(ctx.key, path)
        const ref = ctx.getTailwindConfigRef(tailwindConfig, tailwindKeyPath);

        if (!ref) return tailwindConfig;

        const $key = tailwindKeyPath.slice(-1).join("-");
        const cssVarName = ctx.getCSSVarName(tailwindKeyPath);

        ref[$key] = `var(--${cssVarName})`;

        return tailwindConfig;
      };
    },
    borderWidth: (ctx) => {
      return (tailwindConfig = {}, path = []) => {
        const tailwindKeyPath = getTailwindKeyPath(ctx.key, path)
        const ref = ctx.getTailwindConfigRef(tailwindConfig, tailwindKeyPath);

        if (!ref) return tailwindConfig;

        const $key = tailwindKeyPath.slice(-1).join("-");
        const cssVarName = ctx.getCSSVarName(tailwindKeyPath);

        ref[$key] = `var(--${cssVarName})`;

        return tailwindConfig;
      };
    },
    composite: (ctx) => {
      return (tailwindConfig = {}, path = [], { $value, $type }, mode) => {
        const tailwindKeyPath = getTailwindKeyPath(ctx.tailwindKey, path)
        const ref = ctx.getTailwindConfigRef(tailwindConfig, tailwindKeyPath);

        if (!ref) return tailwindConfig;

        const $key = tailwindKeyPath.slice(-1).join("");

        const compositedValue = [0, {}];
        for (const [_key, _value] of Object.entries($value)) {
          const formattedValue = formatCSSValue(_key, {
            $value: _value,
            $type: "number",
          });
          // const propRef = ctx.getTailwindConfigRef(
          //   tailwindConfig,
          //   [_key, ...tailwindKeyPath].slice(0, -1),
          //   false
          // );

          // propRef[path.slice(-1).join("")] = formattedValue;

          if (_key === "fontSize") {
            compositedValue[0] = formattedValue;
          } else {
            compositedValue[1][_key] = formattedValue;
          }
        }

        ref[$key] = compositedValue;

        return tailwindConfig;
      };
    },
  };

  if (tailwindKeys.composite.includes(ctx.key)) {
    return tailwindValueSetters.composite(ctx);
  } else if (tailwindKeys.color.includes(ctx.key)) {
    return tailwindValueSetters.color(ctx);
  } else if (tailwindKeys.radius.includes(ctx.key)) {
    return tailwindValueSetters.radius(ctx);
  } else if (tailwindKeys.inheritSpacing.includes(ctx.key)) {
    return tailwindValueSetters.inheritSpacing(ctx)
  } else if (tailwindKeys.number.includes(ctx.key)) {
    return tailwindValueSetters.spacing(ctx);
  }
  return tailwindValueSetters.default(ctx);
}

function cssValueSetterFactory(ctx) {
  const cssValueSetters = {
    default: (ctx) => {
      return (cssStyles = {}, path = [], value, opts = {}) => {
        if (!cssStyles || !path || !path.length || null == value) return;

        const mode = opts?.mode ?? null;
        const responsive = opts?.responsive ?? null;

        if (tailwindKeys.composite.includes(ctx.key)) {
          for (const [$key, $value] of Object.entries(value.$value)) {
            const compositePath = [$key, ...path];
            let ref = cssStyles;
            for (const part of compositePath.slice(0, -1)) {
              if (!ref[part]) {
                ref[part] = {};
              }
              ref = ref[part];
            }

            const $type = getTypeFromKey($key);
            ref[compositePath.slice(-1).join("-")] = formatCSSValue($key, {
              $value,
              $type,
            });
          }
          return;
        }

        const cssValue = formatCSSValue(ctx.tailwindKey, value);

        const varName = ctx.getCSSVarName(path);

        if (responsive) {
          const isRoot = true === responsive?.root;
          const isMin = null != responsive?.min
          const isMax = null != responsive?.max

          if (isMin && !cssStyles.media.min[responsive.min]) {
            cssStyles.media.min[responsive.min] = {}
          }
          if (isMax && !cssStyles.media.max[responsive.max]) {
            cssStyles.media.max[responsive.max] = {}
          }

          const dest = isRoot
            ? cssStyles.root
            : cssStyles.media[isMin ? 'min' : 'max'][isMin ? responsive.min : responsive.max]
          
            dest[varName] = cssValue;
        } else if (null == mode) {
          cssStyles.root[varName] = cssValue;
        } else {
          cssStyles.modes[mode][varName] = cssValue;
        }

        return cssStyles;
      };
    },
    composite: (ctx) => {
      return (cssStyles = {}, path = [], value, opts) => {
        if (!cssStyles || !path || !path.length || null == value) return;

        const mode = opts?.mode ?? null;
        const responsive = opts?.responsive ?? null;

        for (const [$key, $value] of Object.entries(value.$value)) {
          const compositePath = [$key, ...path];
          let ref = cssStyles;
          for (const part of compositePath.slice(0, -1)) {
            if (!ref[part]) {
              ref[part] = {};
            }
            ref = ref[part];
          }

          const $type = getTypeFromKey($key);
          ref[compositePath.slice(-1).join("-")] = isRefValue($value)
            ? `var(--${getRefVarKey($value)})`
            : formatCSSValue($key, { $value, $type });
        }

        return cssStyles;
      };
    },
    basic: (ctx) => {
      return (cssStyles = {}, path = [], value, opts) => {
        if (!cssStyles || !path || !path.length || null == value) return;

        const mode = opts?.mode ?? null;
        const responsive = opts?.responsive ?? null;

        responsive && console.log(responsive)

        const cssValue = formatCSSValue(ctx.tailwindKey, value);

        const varName = ctx.getCSSVarName(path);

        if (responsive) {
          const isRoot = true === responsive?.root;
          const isMin = null != responsive?.min
          const isMax = null != responsive?.max

          if (isMin && !cssStyles.media.min[responsive.min]) {
            cssStyles.media.min[responsive.min] = {}
          }
          if (isMax && !cssStyles.media.max[responsive.max]) {
            cssStyles.media.max[responsive.max] = {}
          }

          const dest = isRoot
            ? cssStyles.root
            : cssStyles.media[isMin ? 'min' : 'max'][isMin ? responsive.min : responsive.max]
          
            dest[varName] = cssValue;
        } else if (null == mode) {
          cssStyles.root[varName] = cssValue;
        } else {
          if (!cssStyles.modes[mode]) {
            cssStyles.modes[mode] = {};
          }
          cssStyles.modes[mode][varName] = cssValue;
        }

        return cssStyles;
      };
    },
  };

  if (tailwindKeys.composite.includes(ctx.key)) {
    return cssValueSetters.composite(ctx);
  }

  return cssValueSetters.basic(ctx);
}

function getPropFormatters(keys = []) {
  const propFormatters = {};

  for (const key of keys) {
    propFormatters[key] = new PropFormatter(key);
  }

  return propFormatters;
}

function getTypeFromKey(key) {
  const keysToTypes = {
    fontSize: "number",
    lineHeight: "number",
    letterSpacing: "number",
    fontWeight: "number",
  };
  return keysToTypes[key] ?? null;
}

function getTailwindKeyPath (key, path) {
  return ["fontSize", "padding", 'margin', 'lineHeight', 'letterSpacing', 'gap', 'fontWeight'].includes(key)
  ? [path.join('-')]
  : path;
}