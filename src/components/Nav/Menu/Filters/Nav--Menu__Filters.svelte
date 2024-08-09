<script>
  import { showFilters } from "../";
  import { filters, id } from ".";
  import Filter from "../Filter";
</script>

{#if $showFilters}
<div
  class="flex gap-2 flex-1 w-full min-w-[18rem] md:max-w-[21.25rem]"
  {id}
  hidden={!$showFilters}
  aria-hidden={!$showFilters}
>
  {#each filters as {onChange, ...props}}
  <Filter {...props} on:change={onChange} />
  {/each}
</div>
{/if}
