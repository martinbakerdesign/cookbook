<script>
    import {Select} from 'bits-ui'
    import {Item} from '.'

    export let items = []
</script>

<Select.Content
    class="rounded-1 bg-background-fill-inverted p-1 gap-1 z-50 text-body-sm shadow-lg -translate-y-20"
    {...$$restProps}
	on:keydown
    overlap={true}
    side="top"
    align="end"
>
    {#each items as item}
    <Item {...item} />
    {/each}
  </Select.Content>