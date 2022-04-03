<script>
  import { onMount } from "svelte";

  import NewRecipeButton from "./NewRecipeButton.svelte";
  import SortingToggle from "./SortingToggle.svelte";
  // import TagMultiselect from "./TagMultiselect.svelte";
  let top, io, stuck;

  onMount(() => {
    io = new IntersectionObserver(onObservation, {
      threshold: [0, 1],
    });
    io.observe(top);
  });

  function onObservation([entry]) {
    stuck = entry.intersectionRatio < 1;
  }
</script>

<div id="menu__recipes__header__top" bind:this={top} />
<header class:stuck>
  <div class="container">
    <NewRecipeButton />
    <div class="rhs">
      <!-- <TagMultiselect /> -->
      <SortingToggle />
    </div>
  </div>
</header>

<style lang="scss">
  @import "../../../../styles/colours.scss";
  @import "../../../../styles/sizes.scss";
  @import "../../../../styles/typo.scss";

  #menu__recipes__header__top {
    position: absolute;
    left: 0;
    /* TODO Automate top value */
    top: -3.5rem;
    width: 100%;
    height: 1px;
    user-select: none;
    pointer-events: none;
  }
  header {
    --pad: 1rem;
    position: sticky;
    top: 3.5rem;
    background-color: var(--bg-primary);
    left: 0;
    width: 100%;
    height: calc(2.25rem + var(--pad) * 2);
    z-index: 5;

    .container {
      width: var(--main);
      margin: 0 auto;
      padding: var(--pad) 0;
      display: flex;
      justify-content: space-between;
    }

    &.stuck {
      &:before,
      &:after {
        content: "";
        height: 1px;
        position: absolute;
        pointer-events: none;
        user-select: none;
        left: 0;
        width: 100%;
        background-color: var(--border);
      }
      &:before {
        top: 0;
      }
      &:after {
        content: none;
        bottom: 0;
      }

      box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.05);
    }

    .rhs {
      display: flex;
      gap: $s5;
      align-items: center;
    }
  }
</style>
