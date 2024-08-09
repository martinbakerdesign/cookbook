import { derived } from 'svelte/store';

import FiltersToggleButton from './Nav--Menu__Filters-Toggle-Button.svelte'

const iconProps = {
    minimised: {
        icon: 'filter--20',
        size: 20,
    },
    expanded: {
        icon: 'x--20',
        size: 20,
    },
}

function getIconProps ($showFilters) {
    return {
        ...iconProps[$showFilters ? 'expanded' : 'minimised'],
        label: getLabel($showFilters)
    }
}
function getLabel ($showFilters) {
    return $showFilters ? 'Hide Filters' : 'Show Filters';
}

function getShowButtonStore (isExpanded) {
    return derived([isExpanded], ([$isExpanded]) => !$isExpanded);
}

export {
    FiltersToggleButton as default,
    //
    iconProps,
    //
    getIconProps,
    getLabel,
    getShowButtonStore,
}