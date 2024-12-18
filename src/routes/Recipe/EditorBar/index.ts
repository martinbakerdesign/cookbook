import { toolbarHeight } from 'store/index';
import EditorBar from './Recipe__EditorBar.svelte'
import BlockTypeSwitch from './BlockTypeSwitch'
import {refs} from 'store/recipe'

import { cuedChange, lastSaved, pushing } from "store/index";
import { derived, get, writable } from "svelte/store";
import writableDerived from "utils/store/writableDerived";
import { initToolbar } from '..';
import isTouch from 'store/isTouch';

let ref, timeout;

const saveStatus = derived(
  [pushing, cuedChange],
  ([$pushing, $cuedChange]) => {
    return $pushing ? 'SAVING'
    : $cuedChange != null ? 'CHANGES_CUED'
    : 'SAVED';
  },
  'SAVED'
);

const buttonSize = derived(
  [isTouch],
  ([$isTouch]) => $isTouch ? "lg" : "md"
)

const saveStatusLabel = writableDerived(
  [pushing, cuedChange, lastSaved],
  ([$pushing, $cuedChange, $lastSaved]) => {
    return $pushing
        ? "Saving..."
        : $cuedChange != null
          ? "Changes cued"
          : $lastSaved
            ? "Saved"
            : null
  }
);


function setRefBuilder (key: ObjectValues<typeof refs>) {
    return {
      action: (el: Element | undefined) => {
        if (!key.includes('.')) {
          if (!Object.hasOwn(refs, key)) return;
          refs[key] = el;
          return;
        }
        const path = key.split('.')
        let ref = refs
        for (const segment of path.slice(0,-1)) {
          if (!Object.hasOwn(ref, segment)) return;
          ref = ref[segment];
        }
        ref[path.pop()] = el;
      }
    }
}
function setFixed (el) {
  const vH = window?.visualViewport.height ?? window.innerHeight;
  const offsetTop = window?.visualViewport.offsetTop ?? 0;
  const height = el.offsetHeight;

  toolbarHeight.set(height);

  el.style.position = 'fixed';
  el.style.top = `${vH + offsetTop - height}px`
  el.parentElement.style.paddingBottom = `${height}px`;

  ref = el;
}
function initStatusIndicator () {
  saveStatusLabel.subscribe(($label) => {
    if (!$label) return;
  
    timeout = setTimeout(() => {
      saveStatusLabel.set(null);
    }, 2000);
  });
  saveStatus.subscribe(() => {
    clearTimeout(timeout);
  });

  return () => {
    timeout && clearTimeout(timeout)
    timeout = null;
  }
}
function onVisualViewportResize () {
  if (!ref) return;
  setFixed(ref);
}
function init () {
  window?.visualViewport.addEventListener('resize', onVisualViewportResize)
  window?.visualViewport.addEventListener('scroll', onVisualViewportResize)
  initToolbar()

  return cleanup
}
function cleanup () {
  toolbarHeight.set(0)
  if (!ref) return;
  ref.parentElement.style.removeProperty('padding-bottom');
}

export {
    EditorBar as default,
    BlockTypeSwitch,
    //
    saveStatus,
    saveStatusLabel,
    buttonSize,
    //
    setRefBuilder,
    setFixed,
    init,
    initStatusIndicator
}