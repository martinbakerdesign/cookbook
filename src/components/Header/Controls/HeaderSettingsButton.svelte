<script>
  import Icon from "components/Icon/Icon.svelte";
  import { showSettings } from "store/settings";

  const iconProps = {
    icon: "settings--24",
    size: 24,
  };
  function show() {
    showSettings.set(true);
  }
</script>

<button id="header__settings" type="button" on:click={show}>
  <Icon {...iconProps} />
</button>

<style lang="scss">
  @import "../../../styles/colours.scss";
  @import "../../../styles/sizes.scss";
  @import "../../../styles/typo.scss";

  #header__settings {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    border: 0;
    background-color: transparent;
    outline: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    --fill: #8a8480;
    --hover: var(--accent);
    transition: 75ms cubic-bezier(0.19, 1, 0.22, 1);

    @mixin focus {
      transition-duration: 125ms;
      --fill: var(--accent);
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
