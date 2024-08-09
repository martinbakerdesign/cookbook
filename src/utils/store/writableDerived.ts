import { get, writable } from "svelte/store";

export default function writableDerived (subs, callback) {
    const store = writable([]);
  
    const unsubs = subs.map((sub) => sub.subscribe(() => callback(getValues())));
  
    function getValues () {
      return subs.map(sub => get(sub))
    }
  
    return store
  }