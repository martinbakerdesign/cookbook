<script>
  import moduloop from "utils/math/moduloop";
  import { onMount } from "svelte";
  import { get, writable } from "svelte/store";
  import { searchQuery } from "store/";
  import { suggestion, tagSuggestions } from "store/searchQuery";
  import Icon from "components/Icon/Icon.svelte";
  import Hotkey from "components/Common/Hotkey.svelte";
  import Suggestion from "./HeaderSearchSuggestion.svelte";
  import Tag from "./HeaderSearchTag.svelte";

  let focus,
    hasValue = false;
  let inputRef;

  const arrowKeys = ["ArrowUp", "ArrowDown"];
  const arrowKeyCodes = [38, 40];
  const suggestions = suggestionsStore();
  const iconProps = {
    icon: "search--16",
    size: 14,
    label: "Search",
  };

  onMount(() => {
    window.addEventListener("keyup", onShortcut);
    return () => {
      window.removeEventListener("keyup", onShortcut);
      window.removeEventListener("click", clickOut);
    };
  });

  $: suggestions.set($tagSuggestions);
  $: hasValue = $searchQuery.query.length > 0 || $searchQuery.tags.length > 0;
  $: focus
    ? window.addEventListener("click", clickOut)
    : window.removeEventListener("click", clickOut);

  function suggestionsStore() {
    const suggestions = writable([]);
    const { set: _set, subscribe } = suggestions;

    function set(value) {
      _set(value.slice(0, 5));
    }
    function clear() {
      _set([]);
    }

    return {
      set,
      clear,
      subscribe,
    };
  }
  function toggleFocus({ type }) {
    focus = type === "focus" || $searchQuery.query.length > 0;
  }
  function clear() {
    searchQuery.clear();
    focus = false;
  }
  function onInput() {
    !focus && (focus = true), searchQuery.set(inputRef.value);
  }
  function clickOut({ target }) {
    if (target.closest("#header__search")) return;
    focus = false;
    window.removeEventListener("click", clickOut);
  }
  function onShortcut({ key }) {
    if (focus || key !== "/") return;
    inputRef && inputRef.focus();
  }
  function toggleSuggestion(e) {
    if (
      !arrowKeys.includes(e.key) &&
      !arrowKeyCodes.includes(e.keyCode) &&
      e.key !== "Backspace" &&
      e.keyCode !== 8 &&
      e.key !== "Enter" &&
      e.keyCode !== 13
    )
      return;
    e.preventDefault();

    let isEnter = e.key === "Enter" || e.keyCode === 13;
    let { query, tags } = get(searchQuery);

    // Enter
    if (isEnter && $suggestions.length) {
      let tag = $suggestions[$suggestion];
      searchQuery.addTag(tag), (focus = false);
      return;
    }
    // Arrow Up / Arrow Down
    else if (arrowKeys.includes(e.key) || arrowKeyCodes.includes(e.keyCode)) {
      let isDown = e.key === "ArrowDown" || e.keyCode === 40;

      let index = moduloop(
        $suggestion + (isDown ? 1 : -1),
        0,
        $suggestions.length - 1
      );
      suggestion.set(index);

      return;
    }
    // Backspace
    else if (!query.length && tags.length) {
      focus = true;
      return searchQuery.removeTag();
    }
  }
</script>

<section id="header__search" class:focus class:hasvalue={hasValue}>
  <label for="header__search__input" id="header__search__label"
    ><Icon {...iconProps} /> Search</label
  >
  {#if $searchQuery.tags.length}
    {#each $searchQuery.tags as tag}
      <Tag {tag} />
    {/each}
  {/if}
  <input
    type="search"
    bind:this={inputRef}
    value={$searchQuery.query}
    id="header__search__input"
    on:input={onInput}
    on:focus={toggleFocus}
    on:blur={toggleFocus}
    on:keydown={toggleSuggestion}
  />
  {#if !focus && !hasValue}
    <Hotkey hotkey="/" />
  {:else if focus || hasValue}
    <div id="header__search__icon">
      <Icon icon="search--16" size={16} />
    </div>
    <button
      type="button"
      id="header__search__clear"
      on:click={clear}
      disabled={!$searchQuery.query.length && !$searchQuery.tags.length}
    >
      <Icon icon="close--16" size={16} />
    </button>
    {#if focus}
      {#if $suggestions.length > 0}
        <ul id="header__search__suggestions">
          {#each $suggestions as suggestion, index}
            <Suggestion tag={suggestion} {index} />
          {/each}
        </ul>
      {/if}
    {/if}
  {/if}
</section>

<style lang="scss">
  @import "../../../styles/_colours.scss";
  @import "../../../styles/_sizes.scss";
  @import "../../../styles/_typo.scss";

  #header__search {
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    position: relative;
    border-left: 1px solid $border;
    border-right: 1px solid $border;
    padding-right: $s5;
    padding-left: $s6;
    display: flex;
    align-items: center;

    &__label {
      font-size: 0.875rem;
      color: #211e20;
      letter-spacing: 0;
      line-height: 1rem;
      opacity: 0.5;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: text;
      gap: $s1;

      svg {
        fill: #211e20;
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
      padding-left: $s3;
      // position: absolute;
      // left: 0;
      // top: 0;
      width: 100%;
      height: 100%;
      flex: 1;

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
      left: $s4;
      pointer-events: none;
      opacity: 0.5;
    }

    &__clear {
      right: $s4;
      background-color: transparent;
      border: 0;
      outline: none;
      border-radius: 50%;
      cursor: pointer;
      width: 1.25rem;
      height: 1.25rem;
      box-shadow: 0px 0px 0px 0.125rem $contrast;
      padding: 0.125rem;
      --fill: #3daef5;
      --hover: #f5853f;

      &:hover {
        box-shadow: 0px 0px 0px 0.125rem $accent;
        --fill: #f5853f;
      }
      &:disabled {
        opacity: 0.35;
        user-select: none;
        pointer-events: none;
      }
    }

    &__suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      list-style: none;
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
    right: $s3;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
