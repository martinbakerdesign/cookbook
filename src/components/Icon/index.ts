export {default as default} from "./Icon.svelte";

export {default as defs} from './iconDefs';

export {default as useIcons} from './useIcons';

export const defaultSize = 24;

export function getViewbox (icon: string, iconSize = defaultSize) {
    if (!icon || !icon.length || !icon.includes('--')) return iconSize;

    return parseInt(icon.split("--").pop()) ?? iconSize;
}