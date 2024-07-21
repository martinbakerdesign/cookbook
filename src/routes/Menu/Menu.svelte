<script>
  import { onDestroy } from "svelte";
  import { recipes } from "store";
  import user from "store/user";
  import { Header, Main, Modals } from ".";
  import { modalsCleanUp } from "./Modals";

  $: $user && recipes.refresh();

  onDestroy(modalsCleanUp);
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>

<Header />
<article id="menu">
  <main id="menu__recipes">
    <div class="slide">
      <Main />
    </div>
  </main>

  <Modals />
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/layers" as l;

  #menu {
    position: relative;
  }
  #menu__recipes {
    display: flex;
    flex-direction: column;
    width: 100%;

    .slide {
      margin-top: s.$s9;
      background-color: var(--bg-primary);
      height: 100%;
      position: relative;
    }
  }
</style>
