import { writable } from "svelte/store";
import { localStorage } from "store/";
import menuFilters from "constants/menu__filters";

const authorFilterStore = getMenuFilterStore(menuFilters.author);
const sortKeyFilterStore = getMenuFilterStore(menuFilters.sortKey);
const sortOrderFilterStore = getMenuFilterStore(menuFilters.sortOrder);

function getMenuFilterStore ({key, items}) {
  const store = writable('');
  const initValue = localStorage.get(key) ?? items[0].value;
  function set ($value) {
    store.set($value)
    localStorage.set(key, $value)
  }

  set(initValue);

  return {
    ...store,
    set
  }
}

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
const scrollY = scrollStore();


export {
  authorFilterStore as author,
  sortKeyFilterStore as sortKey,
  sortOrderFilterStore as sortOrder,
  scrollY
}