<script>
  import { name, loading } from "store/";
  import user from "store/user";
  export let min = false;
</script>

{#if $user}
  <!-- <div
    id="recipe__header__name"
    placeholder={"My recipe"}
    class:loading={$loading}
    class:min
    contenteditable="true"
    bind:innerHTML={$name}
  /> -->
  <input
    id="recipe__header__name"
    bind:value={$name}
    class:min
    placeholder={"My recipe"}
    class:loading={$loading}
  />
{:else}
  <div id="recipe__header__name" class:loading={$loading}>{$name}</div>
{/if}

<style lang="scss">
  @use "../../../styles/colours" as c;
  @use "../../../styles/sizes" as s;
  @use "../../../styles/typo" as typo;

  #recipe__header__name {
    @include typo.font-soehne;
      letter-spacing: calc(-0.4 / 42 * 1em);
      line-height: 2.75rem;
      font-weight: 500;
      line-height: 3.5rem;
    }
    outline: none;
    box-shadow: none;
    border: 0;
    margin-bottom: s.$s5;
    background-color: transparent;
    width: 100%;
    min-height: 3.5rem;

    &.min {
      font-size: 1.125rem;
      line-height: 1.5rem;
      margin-bottom: 0;
      flex: 1;
      height: 1.75rem;
    }

    &:empty:before {
      content: attr(placeholder);
      opacity: 0.5;
      cursor: text;
      user-select: none;
    }
    &::placeholder {
      opacity: 0.5;
    }

    &.loading {
      pointer-events: none;
      user-select: none;
      opacity: 0;
    }
  }
</style>
