<script>
  import { getContext, onDestroy } from "svelte";
  import "./Method.scss";

  const { getView, onMount } = getContext("method");

  const view = getView();

  onDestroy(() => {
    view && view.destroy();
  });
</script>

<dl placeholder="Method" class="method">
  <div use:onMount />
</dl>

<style lang="scss">
  @import "../../../../styles/sizes.scss";
  @import "../../../../styles/colours.scss";
  @import "../../../../styles/typo.scss";
</style>
