import getNestedValue from "utils/getNestedValue";
import settingsBlockStore from "./settingsBlockStore";
import { derived } from "svelte/store";
import { reservedKeys } from ".";

export default function settingsGroupStore(key = "", group = {}) {
    const keys = Object.keys(group[key]).filter(
      (_key) => !reservedKeys.includes(_key)
    );
    const stores = keys.map((_key) => settingsBlockStore(
      [key, _key],
      getNestedValue(group, [key, _key].join("."))
    ))
  
    const onUpdate = (merged) => {
      const value = {};
  
      merged.forEach(($value, index) =>
        Object.assign(value, { [keys[index]]: $value })
      );
  
      return value;
    };
  
    const merged = derived(stores, onUpdate);
  
    return {
      key,
      subscribe: merged.subscribe,
      stores
    };
  }