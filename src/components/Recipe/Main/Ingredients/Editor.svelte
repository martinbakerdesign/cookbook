<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import { focus } from "utils/prosemirror/plugins/ingredient/toggleHeader";

  const { getViews, onMount: onDomMount } = getContext("ingredients");
  let view;

  onMount(() => {
    view = getViews().ingredients;
  });
  onDestroy(() => {
    view?.destroy();
  });
</script>

<div
  use:onDomMount
  placeholder="Ingredient"
  class="recipe__editor--ingredients"
  class:focus={$focus}
/>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;
  @import "../../../../styles/typo.scss";

  .recipe__editor--ingredients {
    margin-bottom: s.$s6;
    position: relative;
  }
</style>
