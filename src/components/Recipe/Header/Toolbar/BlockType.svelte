<script>
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "arrow-down--20",
    size: 20,
    role: "presentation",
  };
</script>

<div id="recipe__header__toolbar__block-type" class="recipe__header__select">
  <button
    class="recipe__header__select__button"
    aria-haspopup="listbox"
    aria-controls="recipe__header__toolbar__block-type__options"
    aria-expanded={false}
    tabindex="0"
    disabled={true}
  >
    <span class="recipe__header__select__button__label" />
    <Icon {...iconProps} />
  </button>
  <ul
    id="recipe__header__toolbar__block-type__options"
    class="recipe__header__select__options"
    role="listbox"
    aria-hidden={true}
    aria-activedescendant=""
  />
</div>

<style lang="scss">
  @use "../../../../styles/sizes" as s;

  #recipe__header__toolbar__block-type {
    .recipe__header__select {
      &__button {
        width: 6.25rem;
      }
    }
  }
  :global(#recipe__header__toolbar__block-type
      .recipe__header__select__option) {
    padding: 0 s.$s3;
  }
</style>
