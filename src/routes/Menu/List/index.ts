import { derived } from 'svelte/store'
import { recipes, searchQuery } from 'store/index'
import { author, sortKey, sortOrder } from 'store/menu'
import applyFilters from 'utils/recipes/filter/applyFilters'
import applySort from 'utils/recipes/sort/applySort'

import List from './Menu__List.svelte'
import Item from './Item'

const items = derived(
    [recipes, searchQuery, author, sortKey, sortOrder],
    ([$recipes, $searchQuery, $author, $sortKey, $sortOrder]) => {
        return applySort(
            applyFilters($recipes, $searchQuery, $author),
            {
              key: $sortKey,
              order: $sortOrder,
            }
          )
    }
)

export {
    List as default,
    List,
    Item,
    //
    items
}