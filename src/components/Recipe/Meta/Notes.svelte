<script>
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "translate--24",
    label: "",
    role: "presentation",
    fill: "#8A8480",
  };
</script>

<div id="recipe__meta__notes" class="recipe__meta__wrapper">
  <div class="recipe__meta__label">Translate units</div>
  <div class="recipe__meta__input" contenteditable="true">Metric</div>
  <div class="recipe__meta__icon">
    <Icon {...iconProps} />
  </div>
</div>

<style lang="scss">
  #recipe__meta__notes {
  }
</style>
