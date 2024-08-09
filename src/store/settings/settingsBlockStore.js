import { writable } from "svelte/store";
import getNestedValue from "utils/getNestedValue";
import { settingsConfig } from ".";

/**
 *
 * @param {string[]} key
 * @param {any} initial
 * @returns
 */
export default function settingsBlockStore(key = [], initial = "") {
    const store = writable(initial);
    const { set: _set, subscribe } = store;
  
    const def = getNestedValue(settingsConfig, key.join("."));
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