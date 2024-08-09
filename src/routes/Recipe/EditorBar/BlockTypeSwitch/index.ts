import { derived, get, writable } from 'svelte/store';
import BlockTypeSwitch from './Recipe__EditorBar__BlockTypeSwitch.svelte'
import Option from './Recipe__EditorBar__BlockTypeSwitch__Option.svelte'
import { NODES, NODE_OPTIONS } from 'schemas/recipe';

const refs = {
    outer: null,
    thumb: null,
    optionsContainer: null
}

const currentIndex = writable(0);
const thumbWidth = writable(0);

const options = writable(NODE_OPTIONS[NODES.INGREDIENTS])

const thumbTranslateX = derived(
    [currentIndex, thumbWidth],
    ([$currentIndex, $thumbWidth]) => {
        return $currentIndex * ($thumbWidth + 2)
    }
)

function getOptionClickHandler (index) {
    return () => {
        currentIndex.set(index)
    }
}

function setThumbWidth (width) {
    if (get(thumbWidth) === width) return;

    thumbWidth.set(width);
}

function setValue (value) {
    const $options = get(options);
    const index = $options.findIndex(option => option.type === value);

    const $currentIndex = get(currentIndex);
    if (index === $currentIndex) return;

    currentIndex.set(index);
}



export {
    BlockTypeSwitch as default,
    Option,
    //
    refs,
    options,
    //
    currentIndex,
    thumbWidth,
    thumbTranslateX,
    //
    getOptionClickHandler,
    setThumbWidth,
    setValue
}