import { writable } from "svelte/store";
import getStyles from "utils/dom/getStyles";
import { useSetRef } from "utils/refs";

export { default as default } from "./AutosizeTextarea.svelte";

export function useStore(dispatch) {
  const value = writable("");

  const refs = {
    spacer: null,
    textarea: null
  };
  const setRef = useSetRef(refs);

  const style = writable("");

  function init() {
    const textarea = refs.textarea;

    const readonly = textarea && textarea.hasAttribute('readonly');
  
    textarea && !readonly && ['input', 'change'].forEach((event) => {
      textarea.addEventListener(event, () => {
        dispatch(event, textarea.value);
      })
    })
    
    const spacerChild = refs.spacer.children[0];
    if (!spacerChild) return;

    style.set(getTextStyles(spacerChild));
  }

  return {
    value,
    style,
    setRef,
    init,
  };
}

function getTextStyles(el: HTMLElement) {
  return getStyles(el, [
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "color",
    "letter-spacing",
    "line-height",
  ]);
}