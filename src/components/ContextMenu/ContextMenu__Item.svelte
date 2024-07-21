<script>
  import Icon from "components/Icon/Icon.svelte";

  export let index, shortcut, icon;
  export let label = "";
  export let disabled = false;
  export let onClick = () => {};

  const iconProps = {
    icon: `${icon}--24`,
    size: 16,
  };
</script>

<li class="contextmenu__list__item" role="menuitem">
  <button type="button" tabindex={index + 1} {disabled} on:click={onClick}>
    {#if icon}
      <Icon {...iconProps} />
    {/if}
    {label}
    {#if shortcut}
      <span class="shortcut">
        {shortcut}
      </span>
    {/if}
  </button>
</li>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;

  .contextmenu__list__item {
    button {
      // --fill: #8a8480;
      --fill: #211e20;
      --hover: #fff;
      font-family: inherit;
      padding: s.$s1 0;
      padding-left: 1.75rem;
      padding-right: 0.375rem;
      display: flex;
      text-align: left;
      color: var(--text-primary);
      width: 100%;
      background-color: transparent;
      border-radius: 0.25rem;
      border: 0;
      outline: 0;
      line-height: 1.125rem;
      font-size: inherit;
      cursor: pointer;
      position: relative;

      .shortcut {
        opacity: 0.15;
        margin-left: auto;
        padding-left: s.$s3;
      }

      @mixin focus {
        background-color: c.$accent;
        --fill: var(--white);

        &,
        .shortcut {
          color: var(--white);
        }
      }

      &:focus-visible {
        @include focus;
      }
      @media (hover: hover) {
        &:hover {
          @include focus;
        }
      }
      &:disabled {
        pointer-events: none;
        opacity: 0.25;
      }
    }
  }

  :global(.contextmenu__list__item .icon) {
    position: absolute;
    left: 0.375rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    user-select: none;
  }
</style>
