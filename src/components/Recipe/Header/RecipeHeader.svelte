<script>
  import Name from "./Name.svelte";
  import Meta from "./Meta/Meta.svelte";
  import SaveStatus from "./SaveStatus.svelte";
  import { loading } from "store/";
  import user from "store/user";

  export let headerH;

  // TODO Add recipe URL field

  let height;
  export let min = false;
  $: headerH.set(height);

  function toggleMin() {
    min = !min;
  }
</script>

<header
  id="recipe__header"
  class:min
  bind:clientHeight={height}
  class:loading={$loading}
>
  <Name {min} />
  <!-- <Description /> -->
  <div class="metarow">
    <Meta {min} />
    {#if $user}
      <SaveStatus />
    {/if}
  </div>
  <!-- <Resizer {...{ toggleMin, min }} /> -->
</header>

<style lang="scss">
  @use "../../../styles/colours" as c;
  @use "../../../styles/sizes" as s;

  @keyframes load {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  #recipe__header {
    padding: s.$s6 s.$s7 s.$s5;
    flex: none;
    width: 100%;
    // background-color: c.$white;
    z-index: 10;

    .metarow {
      display: flex;
      justify-content: space-between;
    }

    &.min {
      padding: s.$s3 s.$s7;
      display: flex;
      gap: s.$s6;
    }

    &.loading {
      display: block;
      border-radius: 0.75rem;
      background-color: var(--bg-secondary);
      margin: s.$s6 s.$s7 s.$s5;
      padding: 0;
      animation: load 1500ms infinite linear;
      animation-delay: 1000ms;
      width: calc(100% - 10.5rem);

      .metarow {
        opacity: 0;
        pointer-events: none;
        user-select: none;
      }
    }
  }
</style>
