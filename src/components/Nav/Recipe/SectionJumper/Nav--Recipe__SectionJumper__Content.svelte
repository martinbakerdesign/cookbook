<script>
  import { Select } from "bits-ui";
  import { Item } from ".";

  export let items = [];
  export let selected = null
</script>

<Select.Content
  class="rounded-1 bg-background-fill-inverted p-2 space-y-2 text-body-md tracking-normal shadow-lg z-50 -translate-y-20"
  {...$$restProps}
  on:keydown
  overlap={true}
  side="top"
  align="end"
>
  {#each items as item}
    <Item {...item} isSelected={item.value === selected?.value ?? null} />
  {/each}
</Select.Content>
