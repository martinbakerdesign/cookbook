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
    class="contextmenu"
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

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/layers" as l;

  .contextmenu {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 0.25rem;
    background-color: var(--bg-primary);
    padding: 0.375rem;
    min-width: max-content;
    will-change: transform;
    font-size: 0.75rem;
    letter-spacing: calc(0.1 / 14 * 1em);
    box-shadow: 0px 0px 0.25rem 0px rgba(0, 0, 0, 0.25);
    z-index: l.$header;
    width: 11.25rem;

    &__list {
      list-style: none;
    }
  }
</style>
