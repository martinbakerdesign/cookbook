<script>
  import { loading, isUserAuthor } from "store";
  import user from "store/user";

  import Servings from "./Servings.svelte";
  import Duration from "./Duration.svelte";
  import URL from "../URL.svelte";
  import Tags from "./Tags.svelte";
  import SaveStatus from "./SaveStatus.svelte";
</script>

<div id="recipe__header__meta" class:loading={$loading}>
  <ul class="inputs">
    <Servings />
    <Duration />
    <Tags />
  </ul>
  {#if $isUserAuthor}
    <SaveStatus />
  {/if}
</div>

<style lang="scss">
  @use "../../../../styles/sizes" as sizes;

  #recipe__header__meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .inputs {
      display: flex;
      gap: sizes.$s7;
      list-style: none;
      font-size: 0.875rem;
      color: var(--text-primary);
      letter-spacing: calc(0.2 / 14 * 1em);
      line-height: 1.5rem;

      li span {
        outline: none;
        border: 0;
        box-shadow: none;
        min-width: calc(10 / 14 * 1em);
        display: inline-block;
      }
    }

    &.loading {
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
  }
</style>
