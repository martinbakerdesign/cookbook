<script>
  import { ContextMenu } from "bits-ui";
  import {open, items, Item} from '.'
</script>

<ContextMenu.Root bind:open={$open}>

  <ContextMenu.Trigger>
    <slot />
  </ContextMenu.Trigger>

  <ContextMenu.Content class="z-50 rounded-2 bg-background shadow-lg p-2 flex flex-col gap-y-1 " fitViewport={true} overlap={true}>
    {#each items as item}
      {#if item.type !== 'DIVIDER'}
      <Item {item} />
      {:else}
      <ContextMenu.Separator />
      {/if}
    {/each}
  </ContextMenu.Content>

</ContextMenu.Root>