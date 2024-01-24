<script>
  import { tags, isUserAuthor } from "store/";
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
        ? tags.add($suggestions[$selectedSuggestion])
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

<li class="tags" for="recipe__tags">
  {#each $tags as tag}
    <div class="tag">
      {tag}
      {#if $isUserAuthor}<button on:click={removeTag} data-tag={tag}
          >&times;</button
        >{/if}
    </div>
  {/each}
  {#if $isUserAuthor}
    <div class="inputcontainer">
      <span class="icon--add">+</span>
      <input
        type="text"
        bind:value
        bind:this={input}
        id="recipe__tags"
        placeholder="Add tag"
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
              data-tag={suggestion}
              on:click={addTag}
              class:selected={index === $selectedSuggestion}
              >{suggestion}</button
            >
          {/each}
          {#if !$suggestions.length}
            <span class="no-suggestions">No suggestions</span>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</li>

<style lang="scss">
  @use "../../../../styles/sizes" as sizes;

  .tags {
    width: 100%;
    position: relative;
    display: flex;
    gap: sizes.$s1;
    color: var(--text-primary);
    flex-wrap: wrap;

    .tag,
    input {
      font-size: 0.75rem;
      letter-spacing: calc(0.3 / 12 * 1em);
      padding: sizes.$s1 sizes.$s2;
      line-height: 1rem;
      color: inherit;
      border-radius: 0.25rem;
      height: 1.5rem;
    }
    .tag {
      display: flex;
      align-items: center;
      gap: sizes.$s1;
      background-color: var(--bg-secondary);
      padding-right: 0.375rem;
      cursor: default;

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
        transform: translateY(-0.0625rem);

        @media (hover: hover) {
          &:hover {
            color: var(--accent);
          }
        }
      }
    }
    .icon--add {
      position: absolute;
      left: 0.375rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      user-select: none;
      color: var(--border);
      font-size: 0.875rem;
    }
    input {
      font-family: inherit;
      border: 0;
      margin: 0;
      outline: 0;
      background-color: transparent;
      box-shadow: 0 0 0 0.0625rem inset var(--border);
      padding-left: sizes.$s4;
      border-radius: 0.25rem;
      color: inherit;
      width: 5rem;

      &::placeholder {
        color: var(--border);
        opacity: 1;
      }

      &:focus-visible {
        box-shadow: 0 0 0 0.0625rem inset var(--text-primary);
        width: 10rem;

        &::placeholder {
          opacity: 0;
        }
      }
    }
    .inputcontainer {
      position: relative;
      &,
      input {
        display: inline-block;
      }

      @media (hover: hover) {
        &:hover {
          .icon--add {
            color: var(--text-primary);
          }
          input {
            box-shadow: 0 0 0 0.0625rem inset var(--text-primary);
            color: var(--text-primary);

            &::placeholder {
              color: var(--text-primary);
            }
          }
        }
      }
      &:focus-within {
        .icon--add {
          color: var(--text-primary);
        }
        input {
          width: 10rem;
        }
      }
    }

    &__suggestions {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 0;
      width: 100%;
      background-color: var(--bg-primary);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 0.25rem;
      border-radius: 0.375rem;
      z-index: 100;

      button {
        border: 0;
        outline: 0;
        background-color: transparent;
        font-family: inherit;
        font-size: 0.8125rem;
        display: block;
        appearance: none;
        width: 100%;
        padding: 0.125rem sizes.$s2;
        margin: 0;
        cursor: pointer;
        text-align: left;
        color: inherit;
        border-radius: 0.25rem;
        margin-bottom: 0.125rem;
        &:last-child {
          margin-bottom: 0;
        }

        @mixin focus {
          background-color: var(--accent);
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

      .no-suggestions {
        opacity: 0.5;
        pointer-events: none;
        user-select: none;
        font-style: italic;
        font-size: 0.8125rem;
        padding: 0 sizes.$s3;
      }
    }
  }
</style>
