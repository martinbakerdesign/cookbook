<script>
  import { tags } from "store/";
  import user from "store/user";
  import { writable } from "svelte/store";
  import getSuggestions from "utils/tags/getSuggestions";

  let value = "";
  let input;
  const focus = writable(false);
  const selectedSuggestion = writable(null);
  const suggestions = writable([]);
  $: suggestions.set(value.length > 0 ? getSuggestions(value, $tags) : []);

  function onChange(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      return;
    }
  }
  function onKeydown(e) {
    // Create new tag
    let isEnter = e.key === "Enter" || e.keyCode === 13;
    if (isEnter) {
      e.preventDefault();
      $selectedSuggestion != null
        ? tags.add($suggestions[$selectedSuggestion].name)
        : tags.add(value);
      value = "";
      return;
    }
    // // Edit last tag
    // else if (e.key === "Backspace" && !value.length) {
    //   let lastTag = $tags[$tags.length - 1];
    //   value = lastTag.slice(0, lastTag.length);
    //   tags.remove(lastTag);
    // }
    // Remove last tag
    else if (e.key === "Backspace" && !value.length) {
      let lastTag = $tags[$tags.length - 1];
      // value = lastTag.slice(0, lastTag.length);
      tags.remove(lastTag);
    } else if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.keyCode === 40 ||
      e.keyCode === 38
    ) {
      e.preventDefault();
      if (!value.length || !$suggestions.length) return;
      let isDown = e.key === "ArrowDown" || e.keyCode === 40;
      let current = $selectedSuggestion;

      selectedSuggestion.set(
        isDown
          ? current == null
            ? 0
            : (current + 1) % $suggestions.length
          : current == null
          ? $suggestions.length - 1
          : (current + $suggestions.length - 1) % $suggestions.length
      );
    }
  }
  function removeTag({ target }) {
    tags.remove(target.dataset.tag);
  }
  function toggleFocus(e) {
    if (e.type === "focus") {
      selectedSuggestion.set(null);
      focus.set(true);
      return;
    } else if (
      e.type === "blur" &&
      !e.relatedTarget?.closest(".tags__suggestions")
    ) {
      focus.set(false);
    }
  }
  function addTag({ target }) {
    tags.add(target.dataset.tag);
    focus.set(false);
    value = "";
  }
</script>

<label class="tags" for="recipe__tags">
  {#each $tags as tag}
    <div class="tag">
      {tag}
      {#if $user}<button on:click={removeTag} data-tag={tag}>&times;</button
        >{/if}
    </div>
  {/each}
  {#if $user}
    <div class="inputcontainer">
      <input
        type="text"
        bind:value
        bind:this={input}
        id="recipe__tags"
        placeholder="Tag"
        on:keyup={onChange}
        on:change={onChange}
        on:keydown={onKeydown}
        on:focus={toggleFocus}
        on:blur={toggleFocus}
      />
      {#if $focus && value.length > 0}
        <div class="tags__suggestions">
          {#each $suggestions as suggestion, index}
            <button
              data-tag={suggestion.name}
              on:click={addTag}
              class:selected={index === $selectedSuggestion}
              >{suggestion.name}</button
            >
          {/each}
          {#if !$suggestions.length}
            <span>No suggestions</span>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</label>

<style lang="scss">
  @import "../../../../styles/sizes.scss";
  @import "../../../../styles/colours.scss";
  @import "../../../../styles/typo.scss";

  .tags {
    position: relative;
    display: flex;
    gap: $s1;
    cursor: text;
    color: var(--text-primary);

    .tag,
    input {
      font-size: 0.875rem;
      letter-spacing: calc(0.2 / 14 * 1em);
      line-height: 1rem;
      padding: $s1;
      color: inherit;
    }
    .tag {
      display: flex;
      align-items: center;
      gap: $s1;
      border-radius: 0.5em;
      font-size: 0.75rem;
      padding: $s1 $s2;
      background-color: var(--bg-secondary);

      button {
        border: 0;
        outline: 0;
        background-color: transparent;
        padding: 0;
        margin: 0;
        font-family: inherit;
        cursor: pointer;
        font-size: 1.125rem;
        line-height: inherit;
        height: 1rem;
        color: var(--text-secondary);
      }
    }
    input {
      line-height: 1.5rem;
      font-family: inherit;
      border: 0;
      padding: 0;
      margin: 0;
      outline: 0;
      background-color: transparent;
    }
    .inputcontainer {
      position: relative;
    }

    &__suggestions {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: -0.5rem;
      width: calc(100% + 1rem);
      background-color: var(--bg-primary);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;

      button {
        border: 0;
        outline: 0;
        background-color: transparent;
        font-family: inherit;
        font-size: 0.8125rem;
        display: block;
        appearance: none;
        width: 100%;
        padding: $s1;
        margin: 0;
        cursor: pointer;
        text-align: left;
        color: inherit;
        border-radius: 0.25rem;

        @mixin focus {
          background-color: $accent;
        }
        &:focus {
          @include focus;
        }
        @media (hover: hover) {
          &:hover {
            @include focus;
          }
        }
        &.selected {
          @include focus;
        }
      }
    }
  }
</style>
