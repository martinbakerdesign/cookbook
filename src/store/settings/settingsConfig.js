import { UNITSYSTEM_IMPERIAL, UNITSYSTEM_METRIC } from "data/units/_types";
import detectDarkMode from "utils/client/detectDarkMode";

const settingsConfig = {
    units: {
      heading: "Units",
      isGroup: true,
      volumeUnits: {
        heading: "Default Volume Unit",
        type: "SELECT",
        default: UNITSYSTEM_METRIC,
        options: [
          { value: UNITSYSTEM_METRIC, label: "Metric (mL, L, kL)" },
          { value: UNITSYSTEM_IMPERIAL, label: "Imperial (qt, gal, pint)" },
        ],
      },
      massUnits: {
        heading: "Default Mass Unit",
        type: "SELECT",
        default: UNITSYSTEM_METRIC,
        options: [
          { value: UNITSYSTEM_METRIC, label: "Metric (g, kg, t)" },
          { value: UNITSYSTEM_IMPERIAL, label: "Imperial (oz, lb)" },
        ],
      },
      lengthUnits: {
        heading: "Default Length Unit",
        type: "SELECT",
        default: UNITSYSTEM_METRIC,
        options: [
          { value: UNITSYSTEM_METRIC, label: "Metric (mm, cm, m)" },
          { value: UNITSYSTEM_IMPERIAL, label: "Imperial (in, ft, yd)" },
        ],
      },
      temperatureUnit: {
        heading: "Default Temperature Unit",
        type: "SELECT",
        default: "°C",
        options: [
          { value: "°C", label: "°C Celsius" },
          { value: "°F", label: "°F Fahrenheit" },
          { value: "K", label: "K Kelvin" },
        ],
      },
    },
    fractions: {
      heading: "Fractions",
      isGroup: false,
      description: "",
      type: "SELECT",
      default: "UNIT",
      options: [
        { value: "UNIT", label: "Use unit system default" },
        { value: "DECIMAL", label: "Decimal" },
        { value: "FRACTION", label: "Fraction" },
      ],
    },
    theme: {
      heading: "Theme",
      isGroup: true,
      dark: {
        heading: "Dark Mode",
        type: "SWITCH",
        default: detectDarkMode(),
        onInit: (set) => {
          window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (e) => {
              set(e.matches);
            });
        },
        onChange: (val) => {
          document.body.classList[val === true ? "add" : "remove"]("dark");
        },
      },
    },
  }

  export default settingsConfig;