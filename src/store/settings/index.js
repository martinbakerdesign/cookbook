import { writable } from "svelte/store";
import { localStorage } from "store/index";
import settingsStore from "./settingsStore";
import settingsToggleStore from "./settingsToggleStore";
import settingsDefaultValue from "./settingsDefaultValue";

export {default as reservedKeys} from './reservedKeys'
export {default as settingsConfig} from './settingsConfig'
export {default as settingsDefaultValue} from './settingsDefaultValue'

export { default as settingsStore } from "./settingsStore";
export { default as settingsBlockStore } from "./settingsBlockStore";
export { default as settingsGroupStore } from "./settingsGroupStore";

const settings = settingsStore(JSON.parse(localStorage.get("settings")) ?? settingsDefaultValue);
export default settings;

export const showSettings = settingsToggleStore();

export const settingsFocus = writable(null);