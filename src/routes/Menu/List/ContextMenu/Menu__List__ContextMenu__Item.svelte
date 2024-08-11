<script>
  import { ContextMenu } from "bits-ui";
  import Icon from "components/Icon";

  export let item;

  $: iconProps = {
    icon: `${item.icon}--24`,
    size: 16
  }
</script>

<ContextMenu.Item>
  <button
    class="flex relative pointer py-6 lg:py-2 pl-20 pr-10 text-left w-full text-body-sm rounded-1 border-0 text-text fill-icon bg-background-fill-inverted disabled:pointer-events-none disabled:opacity-25 hover:bg-background-fill-inverted-hover"
    on:click={item?.onClick}
    aria-label={item?.label}
  >
    {#if item?.icon}
      <Icon
        {...iconProps}
        class="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none user-select-none"
      />
    {/if}
    {item.label}
  </button>
</ContextMenu.Item>
