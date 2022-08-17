<script>
  import { link } from "svelte-spa-router";
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "menu--24",
    size: 24,
    label: "Menu",
    role: "img",
    fill: "#645656",
  };
</script>

<a href="/" use:link>
  <Icon {...iconProps} />
  <div class="label">Back to menu</div>
</a>

<style lang="scss">
  @use "../../../styles/sizes" as sizes;
  a {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;

    .label {
      position: absolute;
      left: calc(100% + 0.5rem);
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.8125rem;
      letter-spacing: calc(0.2 / 13 * 1em);
      text-align: right;
      line-height: 1rem;
      transition: transform 100ms ease-in-out;
      cursor: pointer;
      opacity: 0;
      pointer-events: none;
      display: block;
      color: #8a8480;
      text-align: left;
      white-space: nowrap;
    }

    &:hover {
      .label {
        pointer-events: auto;
        opacity: 1;
      }
    }
  }
</style>
