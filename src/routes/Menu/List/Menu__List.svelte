<script>
  import { items, Item, ContextMenu } from ".";
  import { tagsFilter, searchQuery } from "store";
  import { recipeId } from "routes/Menu/Modals";

  $: noRecipes = !$items.length && !$searchQuery.query.length && !$tagsFilter.length;
</script>

<ul id="menu__recipes__list" class="pt-main-t pb-main-b">
  {#if $items.length}
    <ContextMenu>
    {#each $items as recipe, index}
      <Item
        {...recipe}
        {index}
      />
    {/each}
    </ContextMenu>
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