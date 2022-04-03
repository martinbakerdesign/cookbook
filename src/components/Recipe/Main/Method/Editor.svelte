<script>
  import { getContext, onDestroy, onMount } from "svelte";

  import "./Method.scss";

  const { getViews, onMount: onDomMount } = getContext("method");
  let view;

  onMount(() => {
    view = getViews().method;
  });
  onDestroy(() => {
    view && view.destroy();
  });
</script>

<dl placeholder="Method" class="recipe__editor--method">
  <div use:onDomMount />
</dl>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;
  @import "../../../../styles/typo.scss";

  .recipe__editor--method {
    margin-bottom: s.$s6;
    position: relative;
  }
</style>
