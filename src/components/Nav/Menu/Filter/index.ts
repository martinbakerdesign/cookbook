import Filter from './Filter.svelte'
import Trigger from './Filter__Trigger.svelte'
import Content from './Filter__Content.svelte'
import Item from './Filter__Content__Item.svelte'
import useSelect from 'utils/select/useSelect'

type FilterItem = {
    value: string,
    label: string
}

const {getOnChangeCallback, getSelected} = useSelect();

export {
    Filter as default,
    Filter,
    Trigger,
    Content,
    Item,
    //
    type FilterItem,
    //
    getOnChangeCallback,
    getSelected
}