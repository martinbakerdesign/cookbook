import { derived, get, writable } from 'svelte/store';

import NavMenuComponent from './Nav--Menu.svelte'
import NewRecipeButtonComponent from './New-Recipe-Button'
import ImportRecipeButtonComponent from './Import-Recipe-Button'
import SearchComponent from './Search'
import FiltersComponent from './Filters'
import FiltersToggleButtonComponent from './Filters-Toggle-Button'

const expandedBreakpoint = 768;
const isExpanded = writable(window.innerWidth >= expandedBreakpoint);

const Widgets = {
  FILTERS: 'FILTERS'
} as const
type ObjectValues<T> = T[keyof T];
type Widget = ObjectValues<typeof Widgets>;
const widgetFocus = writable<Widget|null>(null);
const showFilters = derived([widgetFocus, isExpanded], ([$widgetFocus, $isExpanded]) => $isExpanded || $widgetFocus === Widgets.FILTERS);
function toggleWidgetFocus () {
  const $widgetFocus = get(widgetFocus)
  
  widgetFocus.set($widgetFocus === Widgets.FILTERS ? null : Widgets.FILTERS);
}

const resizeObserver = new ResizeObserver(onResize);
function onResize () {
  const $isExpanded = window.innerWidth >= expandedBreakpoint;

  if (get(isExpanded) === $isExpanded) return;
  
  isExpanded.set($isExpanded);
  if (!$isExpanded) return;

  widgetFocus.set(null);
}

function init () {
  resizeObserver.observe(document.documentElement);

  return cleanup;
}
function cleanup () {
  resizeObserver.disconnect();
}

export {
  type Widget,
  Widgets,
  //
  NavMenuComponent as default,
  SearchComponent as Search,
  FiltersComponent as Filters,
  NewRecipeButtonComponent as NewRecipeButton,
  ImportRecipeButtonComponent as ImportRecipeButton,
  FiltersToggleButtonComponent as FiltersToggleButton,
  //
  isExpanded,
  widgetFocus,
  showFilters,
  //
  init,
  toggleWidgetFocus
}