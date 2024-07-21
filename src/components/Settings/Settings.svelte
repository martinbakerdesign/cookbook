<script>
  import { showSettings } from "store/settings";
  import { onDestroy, onMount } from "svelte";
  import Modal from "components/Modal";
  import { Aside, Blocks, refs, init, cleanup } from ".";

  onMount(init);
  onDestroy(cleanup);
</script>

<Modal show={$showSettings}>
  <div
    id="settings"
    aria-labelledby="settings__aside__heading"
    bind:this={refs.container}
  >
    <Aside />
    <Blocks />
  </div>
</Modal>

<style lang="scss">
  @use "../../styles/_sizes" as s;
  @use "../../styles/_colours" as c;

  #settings {
    display: grid;
    grid-template-columns: s.$s9 1fr;
    height: calc(100% - 13.75rem);
    width: calc(100% - 58.25rem);
    min-width: 48rem;
    min-height: 32rem;
  }
</style>
