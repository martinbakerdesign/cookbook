<script>
  import Title from "./HeaderTitle.svelte";
  import Search from "./Search/HeaderSearch.svelte";
  import Controls from "./Controls/HeaderControls.svelte";
  import { location } from "svelte-spa-router";
  import { scrollY } from "store/menu";

  let state, stuck;
  let offset = 0;

  $: state = $location === "/" ? "DEFAULT" : "BASIC";

  $: (stuck = $scrollY >= 20),
    (offset = $location === "/" ? Math.min($scrollY, 20) * -1 : 0);
</script>

<header
  id="header"
  data-state={state}
  class:stuck
  style={`transform: translate3d(-50%,${offset}px,0)`}
>
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
    left: 50%;
    width: calc(100% - 2.5rem);
    border-radius: 0.75rem;
    // width: 100%;
    background-color: c.$white;
    display: grid;
    // grid-template-columns: $s9 1fr $s9;
    grid-template-columns: 1fr var(--main) 1fr;
    z-index: l.$header;
    will-change: transform;
    transform: translate3d(-50%, 0, 0);

    &.stuck {
      border-radius: 0;
      margin: 0;
      width: 100%;
      padding-right: s.$s4;
      padding-left: s.$s4;
    }
    &[data-state="BASIC"] {
      background-color: transparent;
      pointer-events: none;
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      top: 0;
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
