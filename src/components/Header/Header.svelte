<script>
  import Title from "./HeaderTitle.svelte";
  import Search from "./Search/HeaderSearch.svelte";
  import Controls from "./Controls/HeaderControls.svelte";
  import { location } from "svelte-spa-router";

  let state;

  $: state = $location === "/" ? "DEFAULT" : "BASIC";
</script>

<header id="header" data-state={state}>
  <Title />
  <Search />
  <Controls />
</header>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/typo" as t;
  @use "../../styles/layers" as l;

  #header {
    position: fixed;
    top: s.$s4;
    left: s.$s4;
    right: s.$s4;
    border-radius: 0.75rem;
    // width: 100%;
    background-color: c.$white;
    display: grid;
    // grid-template-columns: $s9 1fr $s9;
    grid-template-columns: 1fr var(--main) 1fr;
    z-index: l.$header;

    &[data-state="BASIC"] {
      background-color: transparent;
      pointer-events: none;
    }
  }

  :global(#header[data-state="BASIC"]
      #header__title, #header[data-state="BASIC"] #header__search) {
    display: none;
  }
  :global(#header[data-state="BASIC"]
      #header__settings, #header[data-state="BASIC"] #header__user) {
    pointer-events: auto;
  }
</style>
