<script>
  export let min, toggleMin;

  function click() {
    return toggleMin();
  }
</script>

<div class="resizer" on:click={click} class:min />

<style lang="scss">
  @import "../../../styles/sizes.scss";
  @import "../../../styles/colours.scss";

  .resizer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 12px;
    transform: translateY(50%);
    z-index: 1;
    cursor: n-resize;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: transparent;
      height: 4px;
      pointer-events: none;
    }

    @media (hover: hover) {
      &:hover {
        &:before {
          background-color: $accent;
        }
      }
    }

    &.min {
      cursor: s-resize;
    }
  }
</style>
