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

<li
  class="contextmenu__list__item"
  role="menuitem"
>
  <button 
    type="button"
    tabindex={index + 1}
    {disabled}
    on:click={onClick}
    class="flex relative pointer py-2 pl-14 pr-3 text-left w-full bg-transparent rounded-md border-0 leading-500 text-text-default fill-current focus-visible:bg-primary focus-visible:fill-white disabled:pointer-events-none disabled:opacity-25 hover:bg-primary hover:fill-current hover:text-text-inverted"
  >
    {#if icon}
      <Icon {...iconProps} class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none user-select-none" />
    {/if}
    {label}
    {#if shortcut}
      <span class="shortcut opacity-15 ml-auto pl-6">
        {shortcut}
      </span>
    {/if}
  </button>
</li>
