<script>
  import { loading, isUserAuthor, description } from "store/";

  let ref;

  function onChange(e) {
    if (!ref.childElements.length) return;
    ref.innerHTML = ref.textContent;
  }
</script>

{#if $isUserAuthor}
  <h2
    id="recipe__header__description"
    contenteditable="true"
    class:loading={$loading}
    placeholder={"Description"}
    bind:innerHTML={$description}
    on:paste={onChange}
    bind:this={ref}
  />
{:else}
  <h2 id="recipe__header__description" class:loading={$loading}>
    {$description}
  </h2>
{/if}

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @import "../../../styles/typo";

  #recipe__header__description {
    @include font_inter;
    margin-bottom: s.$s6;

    &.loading {
      opacity: 0;
      user-select: none;
      pointer-events: none;
    }

    &,
    &:empty:before {
      font-size: 1.125rem;
      letter-spacing: calc(0.1 / 20 * 1em);
      font-weight: 400;
      line-height: 1.125;
      color: c.$grey-31;
    }
    &:empty:before,
    &:empty:focus:before {
      content: attr(placeholder);
      display: block;
      margin: 0;
      opacity: 0.5;
    }
  }
</style>
