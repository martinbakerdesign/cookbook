<script>
  import Icon from "components/Icon/Icon.svelte";
  import recipe, { amount, scaleFactor } from "store/";
  import scaleRecipe from "utils/recipes/scale";
  import pluralize from "pluralize";
  import { writable } from "svelte/store";
  import { getContext, onMount } from "svelte";
  import stateFromIngredients from "utils/prosemirror/ingredients/stateFromIngredients";

  let inputRef;

  const show = writable(false);
  const { getViews } = getContext("ingredients");
  let view;

  onMount(() => {
    view = getViews().ingredients;
  });

  $: $show && inputRef.focus();
  $: scale(+$scaleFactor);

  function scale(scaleFactor) {
    if (!view) return;
    let scaled = scaleRecipe($recipe, +scaleFactor);
    let newState = stateFromIngredients(scaled.ingredients);
    view.updateState(newState);
  }
  function toggleShow(e) {
    let state = !$show
      ? true
      : e.target.closest(".transformations__icon") == null;
    show.set(state);
  }
</script>

<div
  id="recipe__meta__scale"
  class="recipe__meta__wrapper"
  data-hasvalue="false"
  class:show={$show}
  on:click={toggleShow}
>
  <div class="recipe__meta__label">Notes</div>
  <div class="recipe__meta__icon">
    <Icon
      role="presentation"
      icon={$show ? "close--16" : "scale--24"}
      label={$show ? "Hide" : "Notes"}
    />
  </div>
</div>

<style lang="scss">
</style>
