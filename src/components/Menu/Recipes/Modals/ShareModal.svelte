<script>
  import Modal from "components/Modal/Modal.svelte";
  import { getContext } from "svelte";

  const show = getContext("menu__modals").shareModal;
</script>

<Modal show={$show}>
  <div class="menu__recipes__item__share" />
</Modal>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;

  .menu__recipes__item__share {
  }
</style>
