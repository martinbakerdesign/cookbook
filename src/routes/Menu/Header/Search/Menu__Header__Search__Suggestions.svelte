<script>
  import { suggestions, Suggestion, isFocused } from ".";
  $: showSuggestions = $isFocused && $suggestions.length;
</script>

{#if showSuggestions}
  <ul id="header__search__suggestions">
    {#each $suggestions as {matchLabel, ...suggestion}}
      <Suggestion {...suggestion}>{@html matchLabel}</Suggestion>
    {/each}
  </ul>
{/if}

<style lang="scss">
  @use "../../../../styles/sizes" as sizes;

  #header__search__suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--bg-primary);
    list-style: none;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    overflow: hidden;
  }
</style>
