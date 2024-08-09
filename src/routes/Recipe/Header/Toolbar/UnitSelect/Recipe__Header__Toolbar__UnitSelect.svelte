<script>
  import { onMount } from "svelte";
  import Icon from "components/Icon";
  import {init} from '.';

  onMount(init)
</script>

<div id="recipe__header__toolbar__unit-select" class="recipe__header__select">
  <button
    class="recipe__header__select__button"
    aria-haspopup="listbox"
    aria-expanded={false}
    tabindex="0"
    disabled={true}
    aria-controls="recipe__header__toolbar__unit-select__options"
  >
    <span class="recipe__header__select__button__abbrev" /><span
      class="recipe__header__select__button__label"
    />
    <Icon {...{
      icon: "arrow-down--20",
      size: 20,
      role: "presentation",
    }} />
  </button>
  <ul
    class="recipe__header__select__options"
    role="listbox"
    aria-hidden={true}
    aria-activedescendant=""
    id="recipe__header__toolbar__unit-select__options"
  />
</div>

<style lang="scss">
  @use "../../../../../styles/sizes" as s;

  #recipe__header__toolbar__unit-select {
    .recipe__header__select {
      &__button {
        min-width: 8.5rem;
      }
    }
  }
</style>
