<script>
    import {createEventDispatcher} from'svelte';
    import { Select } from "bits-ui";
    import {Trigger, Content, getOnChangeCallback, getSelected} from '.'
    import { writable } from 'svelte/store';
    
    export let value = writable(null);
    export let label = '';
    export let items = [];

    const dispatch = createEventDispatcher();

    $: selected = getSelected($value, items);
    const onSelectedChange = getOnChangeCallback(dispatch)
</script>

<Select.Root {items} bind:selected={selected} {onSelectedChange} >
    <Trigger {label} />
    <Content {items}/>
</Select.Root>