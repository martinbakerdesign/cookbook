<script>
  import AutosizeTextarea from "components/Inputs/AutosizeTextarea";
  import { loading, description } from "store/";
  import {readonly} from 'store/recipe'

  let ref, empty;

  $: empty = !$description.trim().length;
</script>

<AutosizeTextarea value={description} placeholder="Description" readonly={$readonly}>
  <h2 id="recipe__header__description" class:loading={$loading}>
    {$description}
  </h2>
</AutosizeTextarea>

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
