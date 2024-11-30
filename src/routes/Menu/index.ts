import { modalsCleanUp } from './Modals'

import Menu from './Menu.svelte'

import List from './List'

import Modals from './Modals'
import { searchQuery } from 'store/index'

function cleanup () {
    modalsCleanUp()
    searchQuery.clear()
}

export {
    Menu as default,
    List,
    Modals,
    //
    cleanup
}