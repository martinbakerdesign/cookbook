<script>
  import { link } from "svelte-spa-router";

  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "menu--24",
    size: 24,
    label: "Menu",
    role: "img",
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
    color: var(--text-secondary);
    --fill: var(--text-secondary);
    outline: none;
    box-shadow: none;
    border: 0;
    text-decoration: none;

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
      text-align: left;
      white-space: nowrap;
    }

    @mixin focus {
      color: var(--text-primary);
      --fill: var(--text-primary);
      .label {
        pointer-events: auto;
        opacity: 1;
      }
    }

    @media (hover: hover) {
      &:hover {
        @include focus;
      }
    }

    &:focus-visible {
      @include focus;
      width: unset;
      height: unset;
      transform: translateX(calc(0.5rem * -1));
      padding: sizes.$s1 sizes.$s2;
      border-radius: 0.25rem;
      box-shadow: 0 0 0 0.0625rem var(--text-primary);
      display: flex;
      align-items: center;
      .label {
        position: static;
        transform: none;
        margin-left: 0.5rem;
        transition: none;
      }
    }
  }
</style>
