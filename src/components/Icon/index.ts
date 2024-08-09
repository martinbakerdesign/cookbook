import Icon from "./Icon.svelte";

import defs from './iconDefs';

import useIcons from './useIcons';

const defaultSize = 24;

function getViewbox (icon: string, iconSize = defaultSize) {
    if (!icon || !icon.length || !icon.includes('--')) return iconSize;

    return parseInt(icon.split("--").pop()) ?? iconSize;
}

export {
    Icon as default,
    Icon,
    //
    defs,
    defaultSize,
    //
    useIcons,
    getViewbox
}