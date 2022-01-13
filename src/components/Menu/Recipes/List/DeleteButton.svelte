<script>
  import Icon from "components/Icon/Icon.svelte";
  import { getContext } from "svelte";

  export let id;

  const iconProps = {
    icon: "delete--24",
    size: 24,
    // fill: "#8A8480",
  };

  const modalContext = getContext("menu__modals");

  function deleteRecipe() {
    modalContext.deleteModal.set(true);
    modalContext.id.set(id);
  }
</script>

<button class="menu__recipes__list__item__delete" on:click={deleteRecipe}>
  <Icon {...iconProps} />
</button>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .menu__recipes__list__item__delete {
    border: 0;
    background-color: transparent;
    flex: none;
    cursor: pointer;
    margin: s.$s3 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    width: 1.5rem;
    height: 1.5rem;
    flex: none;
    --fill: #8a8480;
    --hover: #ee7e6a;

    @mixin focus {
      --fill: #ee7e6a;
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
