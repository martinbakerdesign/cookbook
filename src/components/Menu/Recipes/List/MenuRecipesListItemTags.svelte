<script>
  export let tags = [];
  const maxTags = 4;
</script>

<div class="menu__recipes__list__item__tags cell">
  {#each tags.slice(0, maxTags) as tag}
    <tag>{tag}</tag>
  {/each}
  {#if tags.length > maxTags}
    <tag>+{tags.length - maxTags}</tag>
  {/if}
</div>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .cell {
    font-size: 0.75rem;
    letter-spacing: 0;
    line-height: 1.5rem;
    position: relative;
    display: flex;
    padding: 0 s.$s4;
    gap: s.$s1;
    flex: 4;
    white-space: nowrap;
    color: #3b363a;
    letter-spacing: calc(0.1 / 12 * 1em);

    tag {
      padding: 0.25rem 0.5rem 0.1875rem;
      background-color: c.$grey-96;
      border-radius: 0.375em;
      line-height: 1rem;
    }
  }
</style>
