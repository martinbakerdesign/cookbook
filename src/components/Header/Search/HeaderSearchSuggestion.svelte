<script>
  import { searchQuery } from "store/";
  import { suggestion } from "store/searchQuery";

  export let tag, index;

  let selected;

  $: selected = $suggestion === index;

  function onClick() {
    console.log("onClick", { tag });
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
    {tag.name}
  </button>
</li>

<style lang="scss">
  @use "../../../styles/_sizes" as s;
  @use "../../../styles/_colours" as c;

  .header__search__suggestion {
    font-size: 0.875rem;

    &__button {
      padding: s.$s2 s.$s4;
      background-color: transparent;
      color: c.$black;
      cursor: pointer;
      font-size: 0.8125rem;
      border: 0;
      outline: 0;
      margin: 0;
      width: 100%;
      display: block;
      text-align: left;

      @mixin selected {
        background-color: c.$accent;
        color: c.$white;
      }

      &:hover,
      &:focus-visible,
      &.selected {
        @include selected;
      }
    }
  }
</style>
