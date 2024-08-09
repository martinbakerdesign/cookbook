import { settingsFocus } from "store/settings";
import $ from "utils/dom/querySelector";

export { default as default } from "./Settings__Aside.svelte";
export { default as Item } from "./Settings__Aside__Item.svelte";

export const refs = new Map();

export function getClickHandler(index) {
    return (e) => {
        const main = $("#settings__main");
        const block = $(`.settings__block[data-index="${index}"]`);
        const mainTop = main.getBoundingClientRect().top;
        const blockTop = block.getBoundingClientRect().top - mainTop;
        const scrollTo = blockTop + main.scrollTop;
        main.scrollTo(0, scrollTo);
        settingsFocus.set(index);
    }
}

export function getClickOutHandler(index) {
    (e) => {
        if (e.target.closest(`.settings__aside__item[data-index='${index}']`)) return;
        settingsFocus.set(null);
    }
}

export function getFocusChangeHandler (index, clickoutHandler) {
    return ($settingsFocus) => {
        const fns = ['removeEventListener', 'addEventListener'];
        const isInFocus = $settingsFocus === index;
        window[fns[+isInFocus]]('click', clickoutHandler);
    }
}


export function cleanup (clickHandler) {
    return () => {
        window.removeEventListener("click", clickHandler);
    }
}

export function setRef (el: HTMLElement, index: number) {
    refs.set(index, el)
}