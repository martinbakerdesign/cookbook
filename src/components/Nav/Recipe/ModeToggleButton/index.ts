import {
    type Mode
} from '..';
import ModeToggleButton from './Nav--Recipe__Mode-Toggle-Button.svelte'

function getIcon (mode: Mode) {
    return (mode === 'EDIT' ? 'eye' : 'pencil')+'--20';
}

const modeToggleButtonLabels = {
    READ: 'Edit',
    EDIT: 'Read',
}
const getLabel = ($mode) => {
  return modeToggleButtonLabels[$mode] ?? '';
}

export {
    ModeToggleButton as default,
    //
    getIcon,
    getLabel
}