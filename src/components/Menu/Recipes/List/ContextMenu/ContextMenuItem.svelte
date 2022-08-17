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
