<script>
  import Icon from "components/Icon/Icon.svelte";
  export let show;

  const iconProps = {
    icon: "share--24",
    size: 24,
  };
</script>

<button class="menu__recipes__list__item__share" type="button" class:show>
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
