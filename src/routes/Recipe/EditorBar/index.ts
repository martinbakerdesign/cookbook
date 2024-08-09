import { toolbarHeight } from 'store/index';
import EditorBar from './Recipe__EditorBar.svelte'
import BlockTypeSwitch from './BlockTypeSwitch'
import {refs} from 'store/recipe'

import { cuedChange, lastSaved, pushing } from "store/index";
import { derived, get, writable } from "svelte/store";
import writableDerived from "utils/store/writableDerived";


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
let ref;
function setFixed (el) {
  const height = el.offsetHeight;

  toolbarHeight.set(height);

  el.style.position = 'fixed';
  el.parentElement.style.paddingBottom = `${height}px`;

  ref = el;
}

let timeout;

const saveStatus = derived(
  [pushing, cuedChange],
  ([$pushing, $cuedChange]) => {
    return $pushing ? 'SAVING'
    : $cuedChange != null ? 'CHANGES_CUED'
    : 'SAVED';
  },
  'SAVED'
);

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
    //
    setRefBuilder,
    setFixed,
    cleanup,
    initStatusIndicator
}