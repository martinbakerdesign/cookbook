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
    class="flex relative pointer py-6 lg:py-2 pl-20 pr-3 text-left w-full text-body-sm rounded-1 border-0 text-text fill-icon disabled:pointer-events-none disabled:opacity-25 hover:bg-background-fill-accent hover:text-text-accent-on-fill hover:fill-icon-accent-on-fill"
  >
    {#if icon}
      <Icon {...iconProps} class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none user-select-none" />
    {/if}
    {label}
    {#if shortcut}
      <span class="shortcut opacity-15 ml-auto pl-6">
        {shortcut}
      </span>
    {/if}
  </button>
</li>
