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
    cursor: pointer;
    margin: s.$s3;
    margin-left: 0;
    --fill: #8a8480;
    --hover: #ee7e6a;
    width: 1.5rem;
    height: 1.5rem;
    flex: none;
    z-index: 1;
    position: relative;

    @mixin focus {
      --fill: #f5853f;
    }

    &:focus-visible {
      @include focus;
    }

    @media (hover: hover) {
      &:hover {
        @include focus;
      }
    }
  }
</style>
