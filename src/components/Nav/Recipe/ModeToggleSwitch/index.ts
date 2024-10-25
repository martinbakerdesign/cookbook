import { derived, get, writable } from 'svelte/store';
import {
    mode,
    MODES,
    type Mode
} from '..';
import ModeToggleSwitch from './Nav--Recipe__Mode-Toggle-Switch.svelte'
import ModeToggleSwitchOption from './Nav--Recipe__Mode-Toggle-Switch__Option.svelte'

const currentIndex = derived(
    [mode],
    ([$mode]) => {
        return $mode === MODES.EDIT ? 1 : 0;
    }
);

const modeToggleIcons = {
    EDIT: 'pencil',
    READ: 'eye'
}
const modeToggleLabels = {
    READ: 'Read',
    EDIT: 'Edit',
}
const switchOptions = [
    {
        value: 'READ',
        label: modeToggleLabels.READ,
        icon: modeToggleIcons.READ
    },
    {
        value: 'EDIT',
        label: modeToggleLabels.EDIT,
        icon: modeToggleIcons.EDIT
    },
]


const indexToMode = [
    MODES.READ,
    MODES.EDIT,
]

function getIcon (mode: Mode) {
    return modeToggleIcons[mode] ? modeToggleIcons[mode]+'--20' : '';
}

const getLabel = ($mode) => {
  return modeToggleLabels[$mode] ?? '';
}

const refs = {
    outer: null,
    thumb: null,
    option1: null,
    option2: null,
}

function getOptionClickHandler (index) {
    return () => {
        console.log(index)
        const newMode = indexToMode[index];
        if (newMode == null) return;
        mode.set(newMode);
    }
}

const thumbWidth = writable(0);

const thumbTranslateX = derived(
    [currentIndex, thumbWidth],
    ([$currentIndex, $thumbWidth]) => {
        return $currentIndex * ($thumbWidth + 2)
    }
)

function setThumbWidth (width) {
    thumbWidth.set(width);
}

export {
    ModeToggleSwitch as default,
    ModeToggleSwitchOption as Option,
    modeToggleIcons as icons,
    modeToggleLabels as labels,
    //
    currentIndex,
    switchOptions,
    thumbWidth,
    thumbTranslateX,
    //
    refs,
    //
    getIcon,
    getLabel,
    getOptionClickHandler,
    setThumbWidth
}