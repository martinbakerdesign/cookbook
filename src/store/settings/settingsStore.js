import { derived } from "svelte/store";
import { localStorage } from "store/index";
import { reservedKeys, settingsBlockStore, settingsConfig, settingsDefaultValue, settingsGroupStore } from ".";
import getNestedValue from "utils/getNestedValue";
import setNestedValue from "utils/setNestedValue";

// TODO Add import settings block
// Autoconvert units to preferred units

export default function settingsStore(fromStorage = settingsDefaultValue) {
  const merged = mergeSettingsFromLocalStorage(settingsConfig, fromStorage);

  const blocks = Object.entries(merged).map(([key, value]) =>
    settingsConfig[key].isGroup
      ? settingsGroupStore(key, merged)
      : settingsBlockStore([key], value)
  );

  const onBlockUpdate = ([$units, $fractions, $theme]) => ({
    units: $units,
    fractions: $fractions,
    theme: $theme,
  })

  const settings = derived(blocks, onBlockUpdate);

  /**
   * 
   * @param {string[]} keys
   * @param {*} value 
   * @returns 
   */
  function set(keys, value) {
    const block = getNestedValue(blocks, keys);
    if (!block) return;

    const prevValue = JSON.parse(localStorage.get("settings"));
    const newVal = setNestedValue(prevValue, keys, value);
    updateLocalStorage(newVal);

    block.set(value);
  }

  updateLocalStorage(merged);

  return {
    set,
    subscribe: settings.subscribe,
  };
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

function mergeSettingsFromLocalStorage(config, fromStorage) {
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

function updateLocalStorage(value) {
  localStorage.set("settings", JSON.stringify(value));
}

function correctedBlockValue(path = [], block = {}, config = {}) {
  const def = getNestedValue(config, path.join("."));
  const initialValue = getNestedValue(block, path.join("."));
  const defaultValue = def?.default;
  return initialValue != null
    ? correctInitialValues(def, initialValue)
    : defaultValue;
}