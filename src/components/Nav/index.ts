import { derived, writable } from 'svelte/store';
import NavComponent from './Nav.svelte'

import MenuContent from './Menu'
import RecipeContent from './Recipe'
import { location } from 'svelte-spa-router';
import { navHeight } from 'store/index';

const NavContexts = {
    MENU: 'MENU',
    RECIPE: 'RECIPE',
} as const;
type ObjectValues<T> = T[keyof T];
type NavContext = ObjectValues<typeof NavContexts>;

const context = writable<NavContext>('MENU');
location.subscribe(($location) => {
    context.set(NavContexts[$location === '/' ? 'MENU' : 'RECIPE'])
})

const ContentsComponent = derived([context], ([$context]) => {
    switch($context) {
        case NavContexts.RECIPE:
            return RecipeContent;
        default:
        case NavContexts.MENU:
            return MenuContent;
    }
})
let ref;
function setFixed (el) {
    const offsetTop = window?.visualViewport.offsetTop ?? 0;
    const height = el.offsetHeight;

    navHeight.set(height);

    el.style.position = 'fixed'
    el.style.top = `${offsetTop}px`
    el.parentElement.style.paddingTop = `${height}px`

    ref = el;
}
function onVisualViewportResize () {
    if (!ref) return;
    setFixed(ref);
}
function init () {
    window?.visualViewport.addEventListener('resize', onVisualViewportResize)
    window?.visualViewport.addEventListener('scroll', onVisualViewportResize)
    return cleanup
}
function cleanup () {
    if (!ref) return;
    ref.style.removeProperty('padding-bottom')
}

export {
    NavComponent as default,
    ContentsComponent as Contents,
    //
    setFixed,
    init
}