<script>
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "scale--24",
    label: "",
    role: "presentation",
    fill: "#8A8480",
  };
</script>

<div
  id="transformations__scale"
  class="transformations__wrapper"
  data-hasvalue="false"
>
  <div class="transformations__label">Scale recipe</div>
  <div class="transformations__input" contenteditable="true">4 bowls</div>
  <div class="transformations__icon">
    <Icon {...iconProps} />
  </div>
</div>

<style lang="scss">
  @import "../../../styles/sizes.scss";
  @import "../../../styles/colours.scss";
  @import "../../../styles/typo.scss";

  #transformations__scale {
    margin-bottom: $s6;
  }
</style>
