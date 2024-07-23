<script>
  import { itemComponents, items, setRecipeId, setHideContextCallback, setItems } from '.'

  export let pos = [0, 0];
  export let show = false;
  let defaultItems = []
  export {defaultItems as items};
  $: setItems(defaultItems);
  
  export let recipeId;
  $: setRecipeId(recipeId);

  export let hideContext = () => {};
  $: setHideContextCallback(hideContext)
</script>

{#if show}
  <div
    class="contextmenu absolute top-0 left-0 rounded-md p-3 bg-bg-default min-w-max w-110 will-change-transform text-body-sm tracking-loose shadow-lg z-20"
    style={`transform: translate3d(${pos[0]}px, ${pos[1]}px, 0);`}
  >
    <ul
      class="contextmenu__list"
      role="menu"
      aria-orientation="vertical"
      dir="ltr"
      tabindex="-1"
    >
      {#each $items as item, index}
        <svelte:component
          this={itemComponents[item.type]}
          {...{ index, ...item }}
        />
      {/each}
    </ul>
  </div>
{/if}