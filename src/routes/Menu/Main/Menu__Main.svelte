<script>
  import { loadingRecipes } from "store";
  import Animation from "components/Animation";
  import { Header, List } from '.'
  import { wok } from "constants/anim";
</script>

<Header />
<div
  class="container"
  class:loading={$loadingRecipes}
>
  {#if $loadingRecipes}
    <div class="loading">
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

<style lang="scss">
  @use "../../../styles/colours" as c;
  @use "../../../styles/sizes" as s;

  .container {
    width: var(--main);
    margin: 0 auto;
  }
  .loading {
    padding: s.$s6;
    text-align: center;
    font-size: 1rem;
    color: c.$grey-63;
  }
</style>
