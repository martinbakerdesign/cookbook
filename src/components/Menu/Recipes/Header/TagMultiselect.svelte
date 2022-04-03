<script>
  import { writable } from "svelte/store";
  import { tagsQuery, tagsFilter, globalTags } from "store/";

  const focus = writable(false);

  function onInput(e) {
    let value = this.value;
    if (value.length > 0) {
      for (let tag of $globalTags) {
        if (tag.name === value) {
          tagsFilter.update((q) => [...q, tag]), tagsQuery.set("");
        }
      }
    }
  }
  function onFocus() {
    focus.set(true), window.addEventListener("click", clickOff);
  }
  function clickOff(e) {
    if (e.target.closest("#tag-multiselect")) return;
    focus.set(false), window.removeEventListener("click", clickOff);
  }
  function toggleFilter(e) {
    let toggleId = e.target.dataset.id;
    let tag = $globalTags.filter(({ id }) => id === toggleId)[0];

    tagsFilter.update((o) =>
      $tagsFilter.filter(({ id }) => id === toggleId).length
        ? o.filter(({ id }) => id !== toggleId)
        : [...o, tag]
    ),
      tagsQuery.set("");
  }
</script>

<div id="tag-multiselect" data-focus={$focus}>
  <div
    id="tag-multiselect__input"
    tabindex={-1}
    data-hasvalue={$tagsQuery.length > 0}
    data-hasfilter={$tagsFilter.length > 0}
  >
    <!-- tag icon -->
    {#each $globalTags as tag}
      {#if $tagsFilter.filter(({ id }) => id === tag.id).length}
        <li
          class="tag-multiselect__tag"
          data-id={tag.id}
          on:click={toggleFilter}
        >
          {tag.name}
        </li>
      {/if}
    {/each}
    <span
      tabindex={0}
      contenteditable
      bind:innerHTML={$tagsQuery}
      data-placeholder="Tags"
      on:input={onInput}
      on:focus={onFocus}
    />
  </div>
  <div id="tag-multiselect__drawer">
    <ul id="tag-multiselect__drawer__list">
      {#each $globalTags as tag}
        {#if tag.name
          .toLowerCase()
          .includes($tagsQuery.toLowerCase()) && !$tagsFilter.filter(({ id }) => id === tag.id).length}
          <li
            class="tag-multiselect__tag"
            data-id={tag.id}
            on:click={toggleFilter}
          >
            {tag.name}
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  @import "../../../../styles/_colours.scss";
  @import "../../../../styles/_sizes.scss";

  #tag-multiselect {
    display: inline-block;
    font-size: 0.875rem;
    letter-spacing: 0;
    line-height: 1.5rem;
    color: $grey-52;

    &__input {
      display: flex;
      flex-wrap: wrap;
      gap: $s1;

      span {
        font-size: 0.875rem;
        color: $grey-52;
        letter-spacing: 0;
        line-height: 1.5rem;
        font-family: inherit;
        padding: 0;
        border: 0;
        outline: 0;
        display: inline-block;
        flex-grow: 1;
        cursor: text;

        &:before {
          content: attr(data-placeholder);
          opacity: 0.5;
        }
      }

      &[data-hasvalue="true"] {
        span {
          &:before {
            display: none;
          }
        }
      }
    }
    &__drawer {
      position: absolute;
      left: 0;
      width: 100%;
      pointer-events: none;
      opacity: 0;
      top: 100%;
      background-color: $grey-96;
      padding: $s4 0;

      &__list {
        width: var(--main);
        margin: 0 auto;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: $s1;
      }
    }

    &[data-focus="true"] {
      #tag-multiselect {
        &__drawer {
          opacity: 1;
          pointer-events: auto;
        }
      }
    }
  }
  .tag-multiselect {
    &__tag {
      padding: 0 $s2;
      border-radius: 0.75em;
      border: 1px solid $grey-82;
      font-size: 0.75rem;
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-color: $grey-82;
        color: $grey-31;
      }
      &.selected {
        background-color: $accent;
        color: white;
        border-color: $accent;
      }
    }
  }
</style>
