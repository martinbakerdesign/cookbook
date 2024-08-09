<script>
    import {Select} from 'bits-ui'

  export let value;
  export let label;
</script>

  <Select.Item class="flex items-center gap-2 p-4 lg:p-2 rounded-1 select-none hover:bg-background-fill-subtle-hover pl-6 relative" {...{value,label}} let:isSelected>
    {#if isSelected}
    <Select.ItemIndicator class="w-2 h-2 bg-background-fill-accent block rounded-full absolute left-2 top-1/2 -translate-y-1/2 select-none" />
    {/if}
    {label}
  </Select.Item>