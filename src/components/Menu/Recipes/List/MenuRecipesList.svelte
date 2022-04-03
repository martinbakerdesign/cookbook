<script>
  import { tagsFilter, searchQuery, recipes } from "store/";
  import { sortingOptions, sortingSelection } from "store/menu";

  import applyFilters from "utils/recipes/filter/applyFilters";
  import applySort from "utils/recipes/sort/applySort";
  import Item from "./MenuRecipesListItem.svelte";

  let filtered = $recipes;
  $: filtered = applySort(
    $searchQuery.query.length === 0 && $searchQuery.tags.length === 0
      ? $recipes
      : applyFilters(),
    sortingOptions[$sortingSelection]
  );
</script>

<ul id="menu__recipes__list">
  {#if filtered.length}
    {#each filtered as recipe, index}
      <Item {...recipe} {index} />
    {/each}
  {:else if !$searchQuery.query.length && !$tagsFilter.length}
    <div class="empty">☝️ Click here to get started</div>
  {:else}
    <div class="empty">No results</div>
  {/if}
</ul>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @import "../../../../styles/typo.scss";

  #menu__recipes__list {
    padding-top: s.$s4;
    padding-bottom: s.$s6;
    list-style: none;

    .empty {
      padding: 0;
      opacity: 0.5;
      user-select: none;
    }
  }
</style>
