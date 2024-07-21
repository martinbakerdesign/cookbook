<script>
  import {
    loading,
    mutationSource,
  } from "store/index";
  import user from "store/user";
  import fetchRecipe from "utils/db/recipes/fetchRecipe";
  import { getPageTitle, onExternalMutation, Header, Editor, Nav, Meta } from ".";

  export let params = { id: null };
  $: params.id && fetchRecipe(params.id);

  $: onExternalMutation($mutationSource);

  $: title = getPageTitle(params);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article id="recipe">
  {#if !$loading && $user}
    <Nav />
  {/if}
  <main id="recipe__main">
    <Header />
    <Editor />
  </main>
  <!-- TODO Add notes -->
  {#if !$loading}
    <Meta />
  {/if}
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/layers" as l;

  #recipe {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;
    transition: transform 150ms cubic-bezier(0.19, 1, 0.22, 1);
    background-color: var(--bg-secondary);
    z-index: l.$content;

    &__main {
      --pad-x: 3.25rem;
      max-width: 54rem;
      background-color: var(--bg-primary);
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      
      @media screen and (min-width: 1440px) {
        --pad-x: 5.25rem;
        max-width: var(--main);
      }
    }

    &.menu {
      transition-duration: 350ms;
      transform: translate3d(100vw, 0, 0);
    }
  }
</style>
