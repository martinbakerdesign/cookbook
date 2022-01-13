<script>
  import { writable } from "svelte/store";
  import { fetchRecipe, name } from "store/";
  import Header from "components/Recipe/Header/RecipeHeader.svelte";
  import Main from "components/Recipe/Main/RecipeMain.svelte";
  import Nav from "components/Recipe/Nav/RecipeNav.svelte";
  import Transformations from "components/Recipe/Transformations/Transformations.svelte";

  export let params = { id: null };
  $: if (params.id) {
    fetchRecipe(params.id);
  }

  let min = false;
  let headerH = writable(0);
  let container;

  let title = "Recipe";
  $: title = `${
    params.id != null ? `${$name.length > 0 ? $name : "Untitled"} - ` : ""
  }Cookbook`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article bind:this={container}>
  <Nav />
  <div class="slide">
    <Header {min} {...{ headerH }} />
    <Main />
  </div>
  <Transformations />
</article>

<style lang="scss">
  @use "../../styles/layers" as l;

  article {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;
    transition: transform 150ms cubic-bezier(0.19, 1, 0.22, 1);

    .slide {
      background-color: white;
      max-width: var(--main);
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      z-index: l.$content;

      @media screen and (max-width: 1440px) {
        max-width: 68rem;
      }
    }

    &.menu {
      transition-duration: 350ms;
      transform: translate3d(100vw, 0, 0);
    }
  }
</style>
