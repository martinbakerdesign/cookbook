<script>
  import { onDestroy } from "svelte";
  import { recipes } from "store";
  import user from "store/user";
  import { loadingRecipes } from "store";
  import Animation from "components/Animation";
  import { wok } from "constants/anim";
  import { modalsCleanUp } from "./Modals";
  import { Modals, List } from ".";

  $: $user && recipes.refresh();

  onDestroy(modalsCleanUp);
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>

<article id="menu" class="relative">
  <div class="w-full">
    {#if $loadingRecipes}
      <div class="p-6 flex w-full justify-center text-center">
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