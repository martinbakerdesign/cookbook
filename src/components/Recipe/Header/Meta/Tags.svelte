<script>
  import { tags } from "store/";
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
    if (e.key === "Enter" || e.keyCode === 13) {
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
      {tag} <button on:click={removeTag} data-tag={tag}>&times;</button>
    </div>
  {/each}
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

    .tag,
    input {
      font-size: 0.875rem;
      letter-spacing: calc(0.2 / 14 * 1em);
      line-height: 1rem;
      padding: $s1;
    }
    .tag {
      display: flex;
      align-items: center;
      gap: $s1;
      padding: $s1;
      border: 1px solid $border;
      border-radius: 0.5em;

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
      }
    }
    input {
      line-height: 1.5rem;
      font-family: inherit;
      border: 0;
      padding: 0;
      margin: 0;
      outline: 0;
    }
    .inputcontainer {
      position: relative;
    }

    &__suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      border: 1px solid $border;

      button {
        border: 0;
        outline: 0;
        background-color: transparent;
        font-family: inherit;
        font-size: 0.8125rem;
        display: block;
        appearance: none;
        width: 100%;
        padding: $s2 $s3;
        margin: 0;
        cursor: pointer;
        text-align: left;

        @mixin focus {
          background-color: $accent;
        }
        &:focus {
          @include focus;
        }
        &.selected {
          @include focus;
        }
      }
    }
  }
</style>
