<script>
  import { searchQuery } from "store/";
  import { suggestion } from "store/searchQuery";
  // import relative from "data/units/relative";

  export let tag, index;

  let selected;

  $: selected = $suggestion === index;

  let matchMarkup;
  $: matchMarkup = tag.replace(
    new RegExp($searchQuery.query, "gi"),
    (match) => `<b>${match}</b>`
  );

  function onClick() {
    searchQuery.addTag(tag);
  }
  function onPointerEnter() {
    suggestion.set(index);
  }
</script>

<li class="header__search__suggestion">
  <button
    type="button"
    on:click={onClick}
    on:pointerenter={onPointerEnter}
    class:selected
    class="header__search__suggestion__button"
  >
    {@html matchMarkup}
  </button>
</li>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;

  .header__search__suggestion {
    font-size: 0.875rem;

    &__button {
      font-family: inherit;
      letter-spacing: calc(0.1 / 14 * 1em);
      padding: s.$s2 s.$s4;
      background-color: transparent;
      color: var(--text-primary);
      cursor: pointer;
      font-size: 0.875rem;
      border: 0;
      outline: 0;
      margin: 0;
      width: 100%;
      display: block;
      text-align: left;

      @mixin selected {
        background-color: var(--accent);
        color: var(--white);
      }

      &:hover,
      &:focus-visible,
      &.selected {
        @include selected;
      }
    }
  }
</style>
