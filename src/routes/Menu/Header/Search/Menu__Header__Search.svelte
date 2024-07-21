<script>
  import { onDestroy, onMount } from "svelte";
  import { searchQuery } from "store";
  import Icon from "components/Icon/Icon.svelte";
  import Hotkey from "components/Hotkey";
  import {
    Tag,
    Suggestions,
    cleanup,
    init,
    onInput,
    toggleFocus,
    toggleSuggestion,
    setRef,
    hasValue,
    clear,
    isFocused,
    clearDisabled,
    state
  } from ".";

  onMount(init);
  onDestroy(cleanup);
</script>

<section
  id="header__search"
  class:focus={$isFocused}
  class:hasvalue={$hasValue}
>

  <label
    for="header__search__input"
    id="header__search__label"><Icon {...{
      icon: "search--16",
      size: 14,
      label: "Search",
    }} /> Search</label
  >

  {#each $searchQuery.tags as tag}
    <Tag {tag} />
  {/each}

  <input
    type="search"
    value={$searchQuery.query}
    id="header__search__input"
    on:input={onInput}
    on:focus={toggleFocus}
    on:blur={toggleFocus}
    on:keydown={toggleSuggestion}
    use:setRef={"input"}
  />

  {#if $state === 'STATIC'}
    <Hotkey hotkey="/" />
  {:else if $state === 'ACTIVE'}
    <div id="header__search__icon">
      <Icon
        icon="search--16"
        size={16}
      />
    </div>
    <button
      type="button"
      id="header__search__clear"
      on:click={clear}
      disabled={$clearDisabled}
    >
      <Icon
        icon="close--16"
        size={16}
      />
    </button>
    <Suggestions />
  {/if}

</section>

<style lang="scss">
  @use "../../../../styles/sizes" as sizes;

  #header__search {
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    position: relative;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    padding-right: sizes.$s5;
    padding-left: sizes.$s6;
    display: flex;
    align-items: center;
    color: var(--text-primary);
    --fill: var(--text-primary);

    &__label {
      font-size: 0.875rem;
      letter-spacing: 0;
      line-height: 1rem;
      opacity: 0.65;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: text;
      gap: sizes.$s1;

      svg {
        fill: var(--text-primary);
        flex: none;
        display: block;
      }
    }

    &__input {
      border: 0;
      outline: 0;
      background-color: transparent;
      font-family: inherit;
      font-size: 1.25rem;
      line-height: 1.5rem;
      margin: 0;
      padding: 0;
      // padding-bottom: calc(2 / 16 * 1rem);
      padding-left: sizes.$s3;
      // position: absolute;
      // left: 0;
      // top: 0;
      width: 100%;
      height: 100%;
      flex: 1;
      color: inherit;

      &::placeholder {
        opacity: 0;
      }
      &::-ms-clear,
      &::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
      }
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }

    &__icon,
    &__clear {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      flex: none;
    }

    &__icon {
      left: sizes.$s4;
      pointer-events: none;
      opacity: 0.5;
    }

    &__clear {
      right: sizes.$s4;
      background-color: transparent;
      border: 0;
      outline: none;
      border-radius: 50%;
      cursor: pointer;
      width: 1.25rem;
      height: 1.25rem;
      box-shadow: 0px 0px 0px 0.125rem var(--contrast);
      padding: 0.125rem;
      --fill: var(--contrast);
      --hover: var(--accent);

      &:hover {
        box-shadow: 0px 0px 0px 0.125rem var(--accent);
        --fill: var(--accent);
      }
      &:disabled {
        opacity: 0.35;
        user-select: none;
        pointer-events: none;
      }
    }

    &.focus,
    &.hasvalue {
      #header__search {
        &__label {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }
  :global(.hotkey) {
    position: absolute;
    right: sizes.$s3;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
