<script>
  import { onDestroy } from "svelte";
  import { recipes, loadingRecipes } from "store";
  import user from "store/user";
  import { Modals, List ,cleanup } from ".";

  $: $user && recipes.refresh();

  onDestroy(cleanup);
</script>

<svelte:head>
  <title>cookbook</title>
</svelte:head>

<article id="menu" class="relative">
  <div class="w-full">
    {#if !$loadingRecipes}
      <List />
    {/if}
  </div>

  <Modals />
</article>