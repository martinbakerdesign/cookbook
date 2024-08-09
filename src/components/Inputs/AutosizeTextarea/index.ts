import { writable } from "svelte/store";
import getStyles from "utils/dom/getStyles";
import { useSetRef } from "utils/refs";

export { default as default } from "./AutosizeTextarea.svelte";

export function useStore() {
  const refs = {
    spacer: null,
    textarea: null,
    label: null
  };
  const setRef = useSetRef(refs);

  const style = writable("");

  function init() {
    const textarea = refs.textarea;

    const readonly = textarea && textarea.hasAttribute('readonly');
  
    textarea && !readonly && ['input', 'change'].forEach((event) => {
      // textarea.addEventListener(event, () => {
      //   dispatch(event, textarea.value);
      // })
    })
    
    const spacer = refs.spacer;
    if (!spacer) return;

    style.set(getTextStyles(spacer));

    const spacerStyle = getComputedStyle(spacer);
    spacer.style.minHeight = spacerStyle.lineHeight;

    if (!refs.label) return;

    const spacerParentStyle = getComputedStyle(spacer.parentElement)
    for (const property of ['paddingLeft']) {
      const value = spacerParentStyle[property];
      refs.label.style[property] = value;
    }
  }
  function builder (el) {
    setRef(el, 'label');
  }

  return {
    style,
    setRef,
    init,
    builder
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