<script>
  import AutosizeTextarea from "components/Inputs/AutosizeTextarea.svelte";
  import { loading, isUserAuthor, description } from "store/";

  let ref, empty;

  $: empty = !$description.trim().length;
</script>

{#if $isUserAuthor}
  <AutosizeTextarea value={description} placeholder="Description">
    <h2 id="recipe__header__description" class:loading={$loading}>
      {$description}
    </h2>
  </AutosizeTextarea>
{:else}
  <h2 id="recipe__header__description" class:loading={$loading}>
    {$description}
  </h2>
{/if}

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @use "../../../styles/typo" as typo;

  #recipe__header__description {
    @include typo.font_inter;
    margin-bottom: s.$s5;
    color: var(--text-primary);
    font-size: 1.125rem;
    letter-spacing: calc(0.1 / 20 * 1em);
    font-weight: 400;
    line-height: 1.125em;
    min-height: 1.125em;

    &.loading {
      opacity: 0;
      user-select: none;
      pointer-events: none;
    }

    &[contenteditable="true"] {
      cursor: text;
      outline: none;
      border: 0;
    }
  }
</style>
