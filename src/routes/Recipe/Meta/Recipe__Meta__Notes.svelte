<script>
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "translate--24",
    label: "",
    role: "presentation",
    fill: "#8A8480",
  };

  let hidden = true;
</script>

<div id="recipe__meta__notes" class="recipe__meta__wrapper">
  <button
    class="recipe__meta__toggle"
    aria-controls="recipe__meta__notes__notes"
    aria-expanded={!hidden}
  >
  <div class="recipe__meta__icon">
    <Icon {...iconProps} />
  </div>
  <div class="recipe__meta__label">Notes</div>
  </button>
  <div
    class="recipe__meta__input"
    id="recipe__meta__notes__notes"
    {hidden}
    aria-hidden={hidden}
  />
</div>

<style lang="scss">
  #recipe__meta__notes {
  }
</style>
