<script>
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "translate--24",
    label: "",
    role: "presentation",
    fill: "#8A8480",
  };
</script>

<div
  id="transformations__translate"
  data-hasvalue="false"
  class="transformations__wrapper"
>
  <div class="transformations__label">Translate</div>
  <div class="transformations__input" contenteditable="true">Metric</div>
  <div class="transformations__icon">
    <Icon {...iconProps} />
  </div>
</div>

<style lang="scss">
  @import "../../../styles/sizes.scss";
  @import "../../../styles/colours.scss";
  @import "../../../styles/typo.scss";

  #transformations__translate {
  }
</style>
