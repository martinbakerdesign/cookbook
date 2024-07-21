<script>
  import { getRemoveTagCallback } from ".";

  export let tag;

  $: removeTag = getRemoveTagCallback(tag);
</script>

<tag>
  <span class="tag__label">{tag?.name ?? tag}</span>
  <button type="button" class="tag__remove" on:click={removeTag}>&times;</button
  >
</tag>

<style lang="scss">
  @use "../../../../styles/_sizes" as s;
  @use "../../../../styles/_colours" as c;

  tag {
    padding: s.$s1;
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1rem;
    margin-right: s.$s1;
    &:last-of-type {
      margin-right: 0;
    }
  }
  .tag {
    &__label {
      margin-right: s.$s1;
    }
    &__remove {
      padding: 0;
      border: 0;
      outline: 0;
      background-color: transparent;
      font-size: 1.25rem;
      line-height: 1rem;
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      color: var(--text-primary);
    }
  }
</style>
