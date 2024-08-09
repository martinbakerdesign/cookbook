<script>
  import { onMount } from "svelte";
  import { Search, NewRecipeButton, ImportRecipeButton, Filters, FiltersToggleButton, init } from ".";

  onMount(init)
</script>


<NewRecipeButton />

<ImportRecipeButton />

<Search />

<Filters />

<FiltersToggleButton />
