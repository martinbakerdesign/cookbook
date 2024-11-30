<script>
  import { onDestroy } from "svelte";
  import { recipes } from "store";
  import user from "store/user";
  import { loadingRecipes } from "store";
  import Animation from "components/Animation";
  import { wok } from "constants/anim";
  import { Modals, List ,cleanup } from ".";

  $: $user && recipes.refresh();

  onDestroy(cleanup);
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>

<article id="menu" class="relative">
  <div class="w-full">
    {#if $loadingRecipes}
      <div class="fixed inset-0 flex w-full items-center justify-center text-center h-full pointer-events-none">
        <Animation
          {...{
            ...wok,
            fill: "#f5853f",
          }}
        />
      </div>
    {:else}
      <List />
    {/if}
  </div>

  <Modals />
</article>