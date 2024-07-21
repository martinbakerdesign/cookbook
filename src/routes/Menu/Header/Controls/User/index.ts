import { get, writable } from 'svelte/store';

export {default as default} from './Menu__Header__Controls__User.svelte'

export {default as Dropdown} from './Menu__Header__Controls__User__Dropdown.svelte'
export {default as NameCard} from './Menu__Header__Controls__User__NameCard.svelte'
export {default as SignOut} from './Menu__Header__Controls__User__SignOut.svelte'

export const showDropdown = writable(false);

export function toggleDropdown () {
    showDropdown.set(!get(showDropdown));
}