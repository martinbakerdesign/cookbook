import { derived, get, writable } from 'svelte/store';
import SearchComponent from './Nav--Menu__Search.svelte'
import { Widgets } from '..';
import { searchQuery } from 'store/index';

const refs = {
    input: null
}

const isFocused = writable(false);
const hasValue = derived([searchQuery], ([$searchQuery]) => $searchQuery.query.length > 0);

const searchIconProps = {
    icon: 'search--12',
    size: 12,
    label: 'Search'
}

const shortcutHandler = useShortcut('/', () => {
    if (get(isFocused) || !refs.input) return;
    refs.input.focus();
})

function toggleFocus (e) {
    isFocused.set(e.type === 'focus')
}
function getShouldHideStore (isExpanded, widgetFocus) {
    return derived([isExpanded, widgetFocus], ([$isExpanded, $widgetFocus]) => !$isExpanded && $widgetFocus === Widgets.FILTERS)
}
function handleQueryChange (e) {
    const $query = e.target.value;

    searchQuery.set($query);
}
function getContainerFlex ($isExpanded) {
    return $isExpanded ? 'flex-1 md:flex-[2]' : 'flex-1'
}
function getIconClassName ($showIcon) {
    const iconTransform = $showIcon ? 'translate-x-0': '-translate-x-10';
    const iconOpacity = $showIcon ? 'opacity-100': 'opacity-0';

    return `fill-icon-secondary transition-all ${iconTransform} ${iconOpacity}`
}
function handleKeyDown (e) {
    if ('Escape' !== e.key || !refs.input) return;
    refs.input.blur()
}
function init () {
    const keyEvent = 'keyup';

    window.addEventListener(keyEvent, shortcutHandler)
    return () => {
        window.removeEventListener(keyEvent, shortcutHandler)
    }
}
function useShortcut(keyCombo, callback) {
    return (e) => {
        // const checkCtrl = keyCombo.includes('ctrl')
        // const checkAlt = keyCombo.includes('alt')
        // const checkShift = keyCombo.includes('shift')

        // const shiftPressed = !checkShift || true === e?.shiftKey;
        // const shiftPressed = !checkShift || true === e?.shiftKey;
        if (e.key !== keyCombo) return;
        callback && callback();
    }
}
function cancel () {
    if (!refs.input) return;
    refs.input.value = '';
    isFocused.set(false)
    refs.input.blur();
    searchQuery.set('')
}

export {
    SearchComponent as default,
    //
    isFocused,
    hasValue,
    //
    refs,
    searchIconProps,
    //
    toggleFocus,
    getShouldHideStore,
    handleQueryChange,
    handleKeyDown,
    getContainerFlex,
    getIconClassName,
    cancel,
    //
    init
}

