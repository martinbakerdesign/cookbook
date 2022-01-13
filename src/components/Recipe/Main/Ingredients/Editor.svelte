<script>
  import { getContext, onDestroy } from "svelte";
  // import ContextMenu from "./ContextMenu.svelte";
  import "./Ingredients.scss";

  const { getView, onMount } = getContext("ingredients");
  const view = getView();

  onDestroy(() => {
    view && view.destroy();
  });
</script>

<div use:onMount placeholder="Ingredient" class="ingredients">
  <!-- <ContextMenu /> -->
</div>

<style lang="scss">
  @import "../../../../styles/sizes.scss";
  @import "../../../../styles/colours.scss";
  @import "../../../../styles/typo.scss";

  .ingredients {
    margin-bottom: $s6;
    position: relative;
  }
</style>
