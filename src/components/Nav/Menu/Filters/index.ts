import FiltersComponent from "./Nav--Menu__Filters.svelte";
import menuFilters from "constants/menu__filters";
import { author, sortKey, sortOrder } from "store/menu";

const id = 'menu__filters';

function getFilterChangeHandler (store) {
  return (e) => {
    store.set(e.detail)
  }
}

const filters = [
  {
    ...menuFilters.author,
    value: author,
    onChange: getFilterChangeHandler(author),
  },
  {
    ...menuFilters.sortKey,
    value: sortKey,
    onChange: getFilterChangeHandler(sortKey),
  },
  {
    ...menuFilters.sortOrder,
    value: sortOrder,
    onChange: getFilterChangeHandler(sortOrder),
  },
]

export {
  FiltersComponent as default,
  //
  id,
  //
  filters,
};
