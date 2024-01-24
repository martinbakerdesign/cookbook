<script>
  import { getContext } from "svelte";
  import { get, writable } from "svelte/store";

  import Icon from "components/Icon/Icon.svelte";
  import { unitsByTitle, unitsByType } from "data/units";
  import { settings, currentUnit } from "store/";
  import sortByPreferred from "utils/units/sortByPreferred";

  const showOptions = writable(false);
  const focused = writable(null);
  const options = writable([]);
  const current = writable(null);
  $: ($options = getOptions($currentUnit, $settings.units)),
    ($current = $options.filter((o) => o.title === $currentUnit)[0]);
  $: window[$showOptions ? "addEventListener" : "removeEventListener"](
    "keydown",
    onKeyDown
  );
  let disabled;
  $: disabled = $currentUnit == null;

  window.addEventListener("click", onClickOut);

  const iconProps = {
    icon: "arrow-down--20",
    size: 20,
    role: "presentation",
  };

  function getOptions(currentUnit, preferred) {
    let unit = unitsByTitle[currentUnit];
    if (!currentUnit || !unit || disabled)
      return sortByPreferred([], preferred);
    let typeUnits = sortByPreferred(unitsByType[unit.type], preferred);

    return typeUnits;
  }
  function toggleShow() {
    $showOptions = !$showOptions;

    !$showOptions && toggleFocused(null);
  }
  function toggleType({ target }) {
    ($currentUnit = target.closest("li").dataset.value), onEsc();
  }
  function onClickOut({ target }) {
    if (!$showOptions || target.closest("#recipe__header__toolbar__block-type"))
      return;
    $showOptions && onEsc();
  }
  function onKeyDown(e) {
    switch (e.key) {
      case "Escape":
        return onEsc();
      case "Enter":
      case "Space":
        return onOptionClick(e);
      case "ArrowUp":
      case "ArrowDown":
        return onArrowPressed(e.key === "ArrowUp" ? "up" : "down");
      default:
        break;
    }
  }
  function onEsc() {
    ($showOptions = false),
      toggleFocused($options.findIndex((o) => o.title === $currentUnit));
  }
  function onOptionClick(e) {
    e.preventDefault(), ($currentUnit = $options[$focused].title), onEsc();
  }
  function onArrowPressed(updown) {
    let newIndex =
      $focused == null
        ? 0
        : updown === "up"
        ? Math.max($focused - 1, 0)
        : Math.min($focused + 1, $options.length - 1);
    toggleFocused(newIndex);
  }
  function onMouseEnter({ target }) {
    toggleFocused(+target.dataset.index);
  }
  function toggleFocused(index) {
    $focused = index;
  }
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
    <Icon {...iconProps} />
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
  @use "../../../../styles/sizes" as s;

  #recipe__header__toolbar__unit-select {
    .recipe__header__select {
      &__button {
        min-width: 8.5rem;
      }
    }
  }
</style>
