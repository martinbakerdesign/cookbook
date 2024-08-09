const figmaVariables = {
  "colors": {
    "transparent": "transparent",
    "current": "currentColor",
    "white": {
      "DEFAULT": "rgb(var(--colors-white) / <alpha-value>)",
      "alpha": {
        "0": "rgba(var(--colors-white-alpha-0))",
        "1": "rgba(var(--colors-white-alpha-1))",
        "2": "rgba(var(--colors-white-alpha-2))",
        "3": "rgba(var(--colors-white-alpha-3))",
        "4": "rgba(var(--colors-white-alpha-4))",
        "6": "rgba(var(--colors-white-alpha-6))",
        "11": "rgba(var(--colors-white-alpha-11))",
        "17": "rgba(var(--colors-white-alpha-17))",
        "20": "rgba(var(--colors-white-alpha-20))",
        "28": "rgba(var(--colors-white-alpha-28))",
        "46": "rgba(var(--colors-white-alpha-46))",
        "62": "rgba(var(--colors-white-alpha-62))",
        "71": "rgba(var(--colors-white-alpha-71))",
        "81": "rgba(var(--colors-white-alpha-81))",
        "90": "rgba(var(--colors-white-alpha-90))"
      }
    },
    "black": {
      "alpha": {
        "0": "rgba(var(--colors-black-alpha-0))",
        "1": "rgba(var(--colors-black-alpha-1))",
        "2": "rgba(var(--colors-black-alpha-2))",
        "3": "rgba(var(--colors-black-alpha-3))",
        "4": "rgba(var(--colors-black-alpha-4))",
        "6": "rgba(var(--colors-black-alpha-6))",
        "11": "rgba(var(--colors-black-alpha-11))",
        "17": "rgba(var(--colors-black-alpha-17))",
        "20": "rgba(var(--colors-black-alpha-20))",
        "28": "rgba(var(--colors-black-alpha-28))",
        "46": "rgba(var(--colors-black-alpha-46))",
        "62": "rgba(var(--colors-black-alpha-62))",
        "71": "rgba(var(--colors-black-alpha-71))",
        "81": "rgba(var(--colors-black-alpha-81))",
        "90": "rgba(var(--colors-black-alpha-90))"
      }
    },
    "neutral": {
      "50": "rgb(var(--colors-neutral-50) / <alpha-value>)",
      "100": "rgb(var(--colors-neutral-100) / <alpha-value>)",
      "150": "rgb(var(--colors-neutral-150) / <alpha-value>)",
      "200": "rgb(var(--colors-neutral-200) / <alpha-value>)",
      "300": "rgb(var(--colors-neutral-300) / <alpha-value>)",
      "400": "rgb(var(--colors-neutral-400) / <alpha-value>)",
      "500": "rgb(var(--colors-neutral-500) / <alpha-value>)",
      "600": "rgb(var(--colors-neutral-600) / <alpha-value>)",
      "650": "rgb(var(--colors-neutral-650) / <alpha-value>)",
      "700": "rgb(var(--colors-neutral-700) / <alpha-value>)",
      "800": "rgb(var(--colors-neutral-800) / <alpha-value>)",
      "900": "rgb(var(--colors-neutral-900) / <alpha-value>)",
      "950": "rgb(var(--colors-neutral-950) / <alpha-value>)"
    },
    "accent": {
      "50": "rgb(var(--colors-accent-50) / <alpha-value>)",
      "100": "rgb(var(--colors-accent-100) / <alpha-value>)",
      "200": "rgb(var(--colors-accent-200) / <alpha-value>)",
      "300": "rgb(var(--colors-accent-300) / <alpha-value>)",
      "400": "rgb(var(--colors-accent-400) / <alpha-value>)",
      "500": "rgb(var(--colors-accent-500) / <alpha-value>)",
      "600": "rgb(var(--colors-accent-600) / <alpha-value>)",
      "650": "rgb(var(--colors-accent-650) / <alpha-value>)",
      "700": "rgb(var(--colors-accent-700) / <alpha-value>)",
      "800": "rgb(var(--colors-accent-800) / <alpha-value>)",
      "900": "rgb(var(--colors-accent-900) / <alpha-value>)",
      "950": "rgb(var(--colors-accent-950) / <alpha-value>)",
      "DEFAULT": "rgb(var(--colors-accent) / <alpha-value>)"
    },
    "green": {
      "50": "rgb(var(--colors-green-50) / <alpha-value>)",
      "100": "rgb(var(--colors-green-100) / <alpha-value>)",
      "200": "rgb(var(--colors-green-200) / <alpha-value>)",
      "300": "rgb(var(--colors-green-300) / <alpha-value>)",
      "400": "rgb(var(--colors-green-400) / <alpha-value>)",
      "500": "rgb(var(--colors-green-500) / <alpha-value>)",
      "600": "rgb(var(--colors-green-600) / <alpha-value>)",
      "650": "rgb(var(--colors-green-650) / <alpha-value>)",
      "700": "rgb(var(--colors-green-700) / <alpha-value>)",
      "800": "rgb(var(--colors-green-800) / <alpha-value>)",
      "900": "rgb(var(--colors-green-900) / <alpha-value>)",
      "950": "rgb(var(--colors-green-950) / <alpha-value>)"
    },
    "yellow": {
      "50": "rgb(var(--colors-yellow-50) / <alpha-value>)",
      "100": "rgb(var(--colors-yellow-100) / <alpha-value>)",
      "200": "rgb(var(--colors-yellow-200) / <alpha-value>)",
      "300": "rgb(var(--colors-yellow-300) / <alpha-value>)",
      "400": "rgb(var(--colors-yellow-400) / <alpha-value>)",
      "500": "rgb(var(--colors-yellow-500) / <alpha-value>)",
      "600": "rgb(var(--colors-yellow-600) / <alpha-value>)",
      "700": "rgb(var(--colors-yellow-700) / <alpha-value>)",
      "800": "rgb(var(--colors-yellow-800) / <alpha-value>)",
      "900": "rgb(var(--colors-yellow-900) / <alpha-value>)",
      "950": "rgb(var(--colors-yellow-950) / <alpha-value>)"
    },
    "red": {
      "50": "rgb(var(--colors-red-50) / <alpha-value>)",
      "100": "rgb(var(--colors-red-100) / <alpha-value>)",
      "200": "rgb(var(--colors-red-200) / <alpha-value>)",
      "300": "rgb(var(--colors-red-300) / <alpha-value>)",
      "400": "rgb(var(--colors-red-400) / <alpha-value>)",
      "500": "rgb(var(--colors-red-500) / <alpha-value>)",
      "600": "rgb(var(--colors-red-600) / <alpha-value>)",
      "700": "rgb(var(--colors-red-700) / <alpha-value>)",
      "800": "rgb(var(--colors-red-800) / <alpha-value>)",
      "900": "rgb(var(--colors-red-900) / <alpha-value>)",
      "950": "rgb(var(--colors-red-950) / <alpha-value>)"
    },
    "text": {
      "DEFAULT": "rgb(var(--colors-text) / <alpha-value>)",
      "secondary": "rgb(var(--colors-text-secondary) / <alpha-value>)",
      "disabled": "rgb(var(--colors-text-disabled) / <alpha-value>)",
      "inverted": {
        "DEFAULT": "rgb(var(--colors-text-inverted) / <alpha-value>)",
        "secondary": "rgb(var(--colors-text-inverted-secondary) / <alpha-value>)",
        "disabled": "rgb(var(--colors-text-inverted-disabled) / <alpha-value>)"
      },
      "accent": {
        "DEFAULT": "rgb(var(--colors-text-accent) / <alpha-value>)",
        "on-fill": {
          "DEFAULT": "rgb(var(--colors-text-accent-on-fill) / <alpha-value>)",
          "hover": "rgb(var(--colors-text-accent-on-fill-hover) / <alpha-value>)",
          "active": "rgb(var(--colors-text-accent-on-fill-active) / <alpha-value>)",
          "disabled": "rgb(var(--colors-text-accent-on-fill-disabled) / <alpha-value>)"
        }
      },
      "success": {
        "DEFAULT": "rgb(var(--colors-text-success) / <alpha-value>)",
        "on-fill": "rgb(var(--colors-text-success-on-fill) / <alpha-value>)"
      },
      "warning": {
        "DEFAULT": "rgb(var(--colors-text-warning) / <alpha-value>)",
        "on-fill": "rgb(var(--colors-text-warning-on-fill) / <alpha-value>)"
      },
      "critical": {
        "DEFAULT": "rgb(var(--colors-text-critical) / <alpha-value>)",
        "on-fill": "rgb(var(--colors-text-critical-on-fill) / <alpha-value>)"
      }
    },
    "icon": {
      "DEFAULT": "rgb(var(--colors-icon-default) / <alpha-value>)",
      "secondary": "rgb(var(--colors-icon-secondary) / <alpha-value>)",
      "disabled": "rgb(var(--colors-icon-disabled) / <alpha-value>)",
      "inverted": {
        "DEFAULT": "rgb(var(--colors-icon-inverted) / <alpha-value>)",
        "secondary": "rgb(var(--colors-icon-inverted-secondary) / <alpha-value>)",
        "disabled": "rgb(var(--colors-icon-inverted-disabled) / <alpha-value>)"
      },
      "accent": {
        "DEFAULT": "rgb(var(--colors-icon-accent) / <alpha-value>)",
        "on-fill": {
          "DEFAULT": "rgb(var(--colors-icon-accent-on-fill) / <alpha-value>)",
          "hover": "rgb(var(--colors-icon-accent-on-fill-hover) / <alpha-value>)",
          "active": "rgb(var(--colors-icon-accent-on-fill-active) / <alpha-value>)",
          "disabled": "rgb(var(--colors-icon-accent-on-fill-disabled) / <alpha-value>)"
        }
      },
      "success": {
        "DEFAULT": "rgb(var(--colors-icon-success) / <alpha-value>)",
        "on-fill": "rgb(var(--colors-icon-success-on-fill) / <alpha-value>)"
      },
      "warning": {
        "DEFAULT": "rgb(var(--colors-icon-warning) / <alpha-value>)",
        "on-fill": "rgb(var(--colors-icon-warning-on-fill) / <alpha-value>)"
      },
      "critical": {
        "DEFAULT": "rgb(var(--colors-icon-critical) / <alpha-value>)",
        "on-fill": "rgb(var(--colors-icon-critical-on-fill) / <alpha-value>)"
      }
    },
    "background": {
      "DEFAULT": "rgb(var(--colors-background) / <alpha-value>)",
      "inverted": {
        "DEFAULT": "rgb(var(--colors-background-inverted) / <alpha-value>)"
      },
      "fill": {
        "DEFAULT": "rgb(var(--colors-background-fill) / <alpha-value>)",
        "hover": "rgb(var(--colors-background-fill-hover) / <alpha-value>)",
        "active": "rgb(var(--colors-background-fill-active) / <alpha-value>)",
        "selected": "rgb(var(--colors-background-fill-selected) / <alpha-value>)",
        "disabled": "rgb(var(--colors-background-fill-disabled) / <alpha-value>)",
        "subtle": {
          "DEFAULT": "rgb(var(--colors-background-fill-subtle) / <alpha-value>)",
          "hover": "rgb(var(--colors-background-fill-subtle-hover) / <alpha-value>)",
          "active": "rgb(var(--colors-background-fill-subtle-active) / <alpha-value>)",
          "selected": "rgb(var(--colors-background-fill-subtle-selected) / <alpha-value>)",
          "disabled": "rgb(var(--colors-background-fill-subtle-disabled) / <alpha-value>)"
        },
        "inverted": {
          "DEFAULT": "rgb(var(--colors-background-fill-inverted) / <alpha-value>)",
          "hover": "rgb(var(--colors-background-fill-inverted-hover) / <alpha-value>)",
          "active": "rgb(var(--colors-background-fill-inverted-active) / <alpha-value>)",
          "selected": "rgb(var(--colors-background-fill-inverted-selected) / <alpha-value>)",
          "disabled": "rgb(var(--colors-background-fill-inverted-disabled) / <alpha-value>)"
        },
        "accent": {
          "DEFAULT": "rgb(var(--colors-background-fill-accent) / <alpha-value>)",
          "hover": "rgb(var(--colors-background-fill-accent-hover) / <alpha-value>)",
          "active": "rgb(var(--colors-background-fill-accent-active) / <alpha-value>)",
          "selected": "rgb(var(--colors-background-fill-accent-selected) / <alpha-value>)",
          "disabled": "rgb(var(--colors-background-fill-accent-disabled) / <alpha-value>)"
        },
        "success": {
          "DEFAULT": "rgb(var(--colors-background-fill-success) / <alpha-value>)"
        },
        "warning": {
          "DEFAULT": "rgb(var(--colors-background-fill-warning) / <alpha-value>)"
        },
        "critical": {
          "DEFAULT": "rgb(var(--colors-background-fill-critical) / <alpha-value>)"
        },
        "transparent": {
          "DEFAULT": "rgb(var(--colors-background-fill-transparent) / <alpha-value>)",
          "hover": "rgb(var(--colors-background-fill-transparent-hover) / <alpha-value>)",
          "active": "rgb(var(--colors-background-fill-transparent-active) / <alpha-value>)",
          "disabled": "rgb(var(--colors-background-fill-transparent-disabled) / <alpha-value>)"
        }
      },
      "surface": {
        "DEFAULT": "rgb(var(--colors-background-surface) / <alpha-value>)",
        "backdrop": "rgb(var(--colors-background-surface-backdrop) / <alpha-value>)"
      }
    },
    "border": "rgb(var(--borderColor) / <alpha-value>)"
  },
  "padding": (theme) => ({
    ...theme('spacing'),
    "safe-area-inset-top" : "env(safe-area-inset-top)",
    "safe-area-inset-bottom" : "env(safe-area-inset-bottom)",
    "safe-area-inset-left" : "env(safe-area-inset-left)",
    "safe-area-inset-right" : "env(safe-area-inset-right)",
    "element-sm" : "var(--spacing-1)",
    "element-md" : "var(--spacing-2)",
    "element-lg" : "var(--spacing-3)",
    "element-xl" : "var(--spacing-4)",
    "element-2xl" : "var(--spacing-5)",
    "element-3xl" : "var(--spacing-6)",
    "group-sm" : "var(--spacing-1)",
    "group-md" : "var(--spacing-2)",
    "group-lg" : "var(--spacing-3)",
    "page" : "var(--padding-page)",
    "main-t" : "var(--padding-main-t)",
    "main-b" : "var(--padding-main-b)",
  }),
  "aspectRatio": {
    "logo": "39 / 23",
    "square": "1 / 1",
    "unset": "unset"
  },
  "spacing": {
    "0": "var(--spacing-0)",
    "1": "var(--spacing-1)",
    "2": "var(--spacing-2)",
    "3": "var(--spacing-3)",
    "4": "var(--spacing-4)",
    "5": "var(--spacing-5)",
    "6": "var(--spacing-6)",
    "7": "var(--spacing-7)",
    "8": "var(--spacing-8)",
    "9": "var(--spacing-9)",
    "10": "var(--spacing-10)",
    "12": "var(--spacing-12)",
    "14": "var(--spacing-14)",
    "16": "var(--spacing-16)",
    "18": "var(--spacing-18)",
    "20": "var(--spacing-20)",
    "26": "var(--spacing-26)",
    "32": "var(--spacing-32)",
    "42": "var(--spacing-42)",
    "68": "var(--spacing-68)",
    "110": "var(--spacing-110)",
    "px": "var(--spacing-px)"
  },
  "borderRadius": {
    "1": "var(--borderRadius-1)",
    "2": "var(--borderRadius-2)",
    "3": "var(--borderRadius-3)",
    "6": "var(--borderRadius-6)",
    "10": "var(--borderRadius-10)",
    "full": "var(--borderRadius-full)"
  },
  "borderWidth": {
    "none": "none",
    "0": "0",
    "2": "var(--spacing-1)",
    "DEFAULT": "var(--spacing-px)"
  },
  "fontSize": {
    "275": "var(--fontSize-275)",
    "300": "var(--fontSize-300)",
    "325": "var(--fontSize-325)",
    "350": "var(--fontSize-350)",
    "400": "var(--fontSize-400)",
    "450": "var(--fontSize-450)",
    "500": "var(--fontSize-500)",
    "550": "var(--fontSize-550)",
    "600": "var(--fontSize-600)",
    "750": "var(--fontSize-750)",
    "800": "var(--fontSize-800)",
    "900": "var(--fontSize-900)",
    "1000": "var(--fontSize-1000)",
    "heading-3xl": [
      "var(--fontSize-900)",
      {
        "lineHeight": "var(--lineHeight-1200)",
        "letterSpacing": "var(--letterSpacing-densest)",
        "fontWeight": "var(--fontWeight-bold)"
      }
    ],
    "heading-2xl": [
      "var(--fontSize-750)",
      {
        "lineHeight": "var(--lineHeight-1000)",
        "letterSpacing": "var(--letterSpacing-denser)",
        "fontWeight": "var(--fontWeight-bold)"
      }
    ],
    "heading-xl": [
      "var(--fontSize-600)",
      {
        "lineHeight": "var(--lineHeight-800)",
        "letterSpacing": "var(--letterSpacing-dense)",
        "fontWeight": "var(--fontWeight-bold)"
      }
    ],
    "heading-lg": [
      "var(--fontSize-500)",
      {
        "lineHeight": "var(--lineHeight-600)",
        "letterSpacing": "var(--letterSpacing-dense)",
        "fontWeight": "var(--fontWeight-semibold)"
      }
    ],
    "heading-md": [
      "var(--fontSize-350)",
      {
        "lineHeight": "var(--lineHeight-500)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-semibold)"
      }
    ],
    "heading-sm": [
      "var(--fontSize-325)",
      {
        "lineHeight": "var(--lineHeight-500)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-semibold)"
      }
    ],
    "heading-xs": [
      "var(--fontSize-300)",
      {
        "lineHeight": "var(--lineHeight-400)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-semibold)"
      }
    ],
    "body-lg": [
      "var(--fontSize-350)",
      {
        "lineHeight": "var(--lineHeight-500)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-regular)"
      }
    ],
    "body-md": [
      "var(--fontSize-325)",
      {
        "lineHeight": "var(--lineHeight-500)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-regular)"
      }
    ],
    "body-sm": [
      "var(--fontSize-300)",
      {
        "lineHeight": "var(--lineHeight-400)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-regular)"
      }
    ],
    "body-xs": [
      "var(--fontSize-275)",
      {
        "lineHeight": "var(--lineHeight-300)",
        "letterSpacing": "var(--letterSpacing-normal)",
        "fontWeight": "var(--fontWeight-regular)"
      }
    ]
  },
  "lineHeight": {
    "300": "var(--lineHeight-300)",
    "400": "var(--lineHeight-400)",
    "500": "var(--lineHeight-500)",
    "600": "var(--lineHeight-600)",
    "700": "var(--lineHeight-700)",
    "800": "var(--lineHeight-800)",
    "1000": "var(--lineHeight-1000)",
    "1200": "var(--lineHeight-1200)"
  },
  "letterSpacing": {
    "densest": "var(--letterSpacing-densest)",
    "denser": "var(--letterSpacing-denser)",
    "dense": "var(--letterSpacing-dense)",
    "normal": "var(--letterSpacing-normal)",
    "loose": "var(--letterSpacing-loose)",
    "looser": "var(--letterSpacing-looser)",
    "loosest": "var(--letterSpacing-loosest)"
  },
  "fontWeight": {
    "regular": "var(--fontWeight-regular)",
    "medium": "var(--fontWeight-medium)",
    "semibold": "var(--fontWeight-semibold)",
    "bold": "var(--fontWeight-bold)"
  },
  "gap": (theme) => ({
    ...theme('spacing'),
    "1" : "var(--spacing-1)",
    "2" : "var(--spacing-2)",
    "3" : "var(--spacing-3)",
    "4" : "var(--spacing-4)",
    "5" : "var(--spacing-5)",
    "6" : "var(--spacing-6)",
  }),
  "borderColor": {
    "DEFAULT": "rgb(var(--borderColor) / <alpha-value>)",
    "disabled": "rgb(var(--borderColor-disabled) / <alpha-value>)"
  }
};

export default figmaVariables;