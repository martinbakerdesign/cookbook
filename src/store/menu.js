import { get, writable } from "svelte/store";
import { location, querystring } from "svelte-spa-router";
import { localStorage } from "store/";

const sortKey = "menu__list--sort";
const authorKey = "menu__list--author";

export const sortingOptions = [
  { value: 0, label: "Created recently", key: "created", dir: "DESC" },
  {
    value: 1,
    label: "Edited recently",
    key: "last_edited",
    dir: "DESC",
  },
];

export const authorOptions = [
  { value: 0, label: "Created by anyone", key: "anyone" },
  {
    value: 1,
    label: "Created by me",
    key: "by_me",
  },
  {
    value: 2,
    label: "Not created by me",
    key: "not_by_me",
  },
];

function menuSelectionStore(init, key = "") {
  const { set: _set, update, subscribe } = writable(+init);

  function set(newVal) {
    localStorage.set(key, +newVal);
    _set(+newVal);
  }
  return {
    subscribe,
    set,
  };
}

let sortingSelectionInStorage = localStorage.get(sortKey) ?? 0;
let authorSelectionInStorage = localStorage.get(authorKey) ?? 0;

sortingSelectionInStorage == null &&
  ((sortingSelectionInStorage = 0),
  localStorage.set(sortKey, sortingSelectionInStorage));
authorSelectionInStorage == null &&
  ((authorSelectionInStorage = 0),
  localStorage.set(authorKey, authorSelectionInStorage));

export const sortingSelection = menuSelectionStore(
  sortingSelectionInStorage, sortKey
);
export const authorSelection = menuSelectionStore(
  authorSelectionInStorage, authorKey
);

function scrollStore() {
  const scrollY = writable(0);
  const { set, subscribe } = scrollY;
  let ref;

  function watch(el) {
    ref = el;

    el.addEventListener("scroll", onScroll, true);
  }
  function onScroll() {
    set(ref.scrollTop);
  }
  function destroy() {
    ref.removeEventListener("scroll", onScroll);
  }

  return {
    subscribe,
    watch,
    destroy,
    set,
  };
}
export const scrollY = scrollStore();
