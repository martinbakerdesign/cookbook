import { derived, get, writable } from "svelte/store";
import { storage } from "store/";
import detectDarkMode from "utils/client/detectDarkMode";
import { UNITSYSTEM_IMPERIAL, UNITSYSTEM_METRIC } from "data/units/_types";
import temperatureUnits from "data/units/temperature";

// TODO Add import settings block
// Autoconvert units to preferred units

export const settingsConfig = {
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
};

export const settingsInitial = {
  units: {
    volumeUnits: UNITSYSTEM_METRIC,
    massUnits: UNITSYSTEM_METRIC,
    lengthUnits: UNITSYSTEM_METRIC,
    temperatureUnit: "°C",
  },
  fractions: "UNIT",
  theme: {
    dark: detectDarkMode(),
  },
};

export const reservedKeys = [
  "heading",
  "description",
  "type",
  "default",
  "options",
  "description",
  "onInit",
  "onChange",
  "isGroup",
];

export default function settingsStore(fromStorage = settingsInitial) {
  let merged = mergeSettingsFromStorage(settingsConfig, fromStorage);

  const blocks = Object.entries(merged).map(([key, value]) =>
    settingsConfig[key].isGroup
      ? settingsGroupStore(key, merged)
      : settingsBlockStore([key], value)
  );

  const settings = derived(blocks, ([units, fractions, theme]) => ({
    units,
    fractions,
    theme,
  }));

  function set(key, value) {
    let block =
      key.length > 1
        ? blocks
            .filter((b) => b.key === key[0])[0]
            .stores.filter((b) => b.key === key[1])[0]
        : blocks.filter((b) => b.key === key[0])[0];
    if (!block) return;

    let prev = JSON.parse(storage.get("settings"));
    let newVal = {
      ...prev,
      [key[0]]:
        key.length === 1
          ? value
          : {
              ...prev[key[0]],
              [key[1]]: value,
            },
    };
    updateStorage(newVal);

    block.set(value);
  }

  updateStorage(merged);

  return {
    set,
    subscribe: settings.subscribe,
  };
}

export const showSettings = settingsToggleStore();

export const settingsFocus = writable(null);

function settingsGroupStore(key = "", group = {}) {
  const keys = Object.keys(group[key]).filter(
    (_key) => !reservedKeys.includes(_key)
  );

  const stores = keys.map((_key) => {
    return settingsBlockStore([key, _key], getNestedValue(group, [key, _key]));
  });

  const merged = derived(stores, (merged) => {
    let values = {};
    let k = 0;
    for (let key of keys) {
      values[key] = merged[k];
      k++;
    }
    return values;
  });

  return {
    key,
    subscribe: merged.subscribe,
    stores,
  };
}

function settingsBlockStore(key = [], initial = "") {
  const store = writable(initial);
  const { set: _set, subscribe } = store;

  const def = getNestedValue(settingsConfig, [key]);
  const onChange = def.onChange ?? null;
  const onInit = def.onInit ?? null;

  onInit && onInit(set);
  set(initial);

  return {
    key: key.pop(),
    set,
    subscribe,
  };

  function set(value) {
    _set(value);
    onChange && onChange(value);
  }
}

function correctInitialValues(def, value) {
  switch (def.type) {
    default:
    case "TEXT":
      return typeof value === "string" ? value : "";
    case "SELECT":
      let correct = def.options.map(({ value }) => value);
      return correct.includes(value) ? value : correct[0];
    case "SWITCH":
      return value === true || value === false ? value : def.default;
  }
}

function settingsToggleStore() {
  const showSettings = writable(false);
  const { set, subscribe } = showSettings;

  function toggle() {
    set(!get(showSettings));
  }

  return {
    toggle,
    set,
    subscribe,
  };
}

function mergeSettingsFromStorage(config, fromStorage) {
  let merged = {};

  for (let key in settingsConfig) {
    if (reservedKeys.includes(key)) continue;

    if (settingsConfig[key].isGroup === true) {
      merged[key] = {};

      for (let _key in settingsConfig[key]) {
        if (reservedKeys.includes(_key)) continue;
        merged[key][_key] = correctedBlockValue(
          [key, _key],
          fromStorage,
          config
        );
      }
      continue;
    }

    merged[key] = correctedBlockValue([key], fromStorage, config);
  }

  return merged;
}

function correctedBlockValue(path = [], block = {}, config = {}) {
  let def = getNestedValue(config, path);
  let initialValue = getNestedValue(block, path);
  let defaultValue = def?.default;
  return initialValue != null
    ? correctInitialValues(def, initialValue)
    : defaultValue;
}

export function getNestedValue(obj = { default: "" }, path = []) {
  let value = { ...obj };
  path = path.flat(2);

  for (let key of path) {
    value = value[key] ?? null;
    if (value == null) break;
  }

  return value;
}

function updateStorage(value) {
  storage.set("settings", JSON.stringify(value));
}
