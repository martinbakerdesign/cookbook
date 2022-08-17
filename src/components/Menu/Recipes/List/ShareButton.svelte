<script>
  import { getContext } from "svelte";

  import Icon from "components/Icon/Icon.svelte";

  export let id;

  const modalContext = getContext("menu__modals");

  const iconProps = {
    icon: "share--24",
    size: 24,
  };

  function openShareDialog() {
    modalContext.shareModal.set(true);
    modalContext.id.set(id);
  }
</script>

<button
  class="menu__recipes__list__item__share"
  type="button"
  on:click={openShareDialog}
  aria-label="Share Recipe"
>
  <Icon {...iconProps} />
</button>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;

  .menu__recipes__list__item__share {
    border: 0;
    background-color: transparent;
    padding: 0;
    opacity: 0;
    pointer-events: none;
    cursor: pointer;
    margin: s.$s3;
    margin-left: 0;
    --fill: #8a8480;
    --hover: #f5853f;
    width: 1.5rem;
    height: 1.5rem;
    flex: none;

    &.show {
      opacity: 1;
      pointer-events: auto;
    }
    &:hover {
      --fill: #f5853f;
    }
  }
</style>
