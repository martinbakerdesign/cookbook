import { reservedKeys, showSettings } from "store/settings";
import $ from 'utils/dom/querySelector'

export { default as default } from "./Settings.svelte";
export { default as Input } from "./Input";
export { default as Aside } from "./Aside";
export { default as Blocks } from "./Blocks";

export const refs = {
  container: null,
};

export function getControls(config) {
  const controls = {};

  for (let key in config) {
    if (reservedKeys.includes(key)) continue;
    controls[key] = config[key];
  }

  return controls;
}

export function onEscape(e) {
  if (e.keyCode !== 27 && e.key !== 'Escape') return;

  showSettings.set(false);
}

export function onClickOut(e) {
  if (
    e.target.closest("#settings") ||
    e.target.closest("#header__settings") ||
    e.target.closest(".input__option") ||
    refs.container.contains(e.target)
  )
    return;
  showSettings.set(false);
}

export function init () {
  showSettings.subscribe($show => {
    const fns = ['removeEventListener', 'addEventListener'];
    window[fns[+$show]]("click", onClickOut);

    if (!$("html")) return;

    const overflowY = $show ? "hidden" : "auto";
    $("html").style.overflowY = overflowY;
});
}
export function cleanup () {
    window.removeEventListener("click", onClickOut);
}