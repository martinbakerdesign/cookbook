<script>
  import { items, Item } from ".";
  import { tagsFilter, searchQuery } from "store";

  $: noRecipes = !$items.length && !$searchQuery.query.length && !$tagsFilter.length;
</script>

<ul id="menu__recipes__list" class="pt-main-t pb-main-b">
  {#if $items.length}
    {#each $items as recipe, index}
      <Item
        {...recipe}
        {index}
      />
    {/each}
  {:else}
  <div class="opacity-50 select-none px-page">
    {#if noRecipes}
    ☝️ Click "New Recipe" to create your first recipe!
      {:else}
      No results
      {/if}
  </div>
  {/if}
</ul>