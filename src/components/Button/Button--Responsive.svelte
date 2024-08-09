<script>
  import Button
    // , { type ButtonProps }
    from ".";
  import Icon from "components/Icon";

  $: iconProps = {
    icon,
  };
  $: hasIcon = icon != null;

  let className = undefined;
  export { className as class };
  export let expanded
  // : boolean
  = false;
  export let icon
  // : string | undefined 
  = undefined;
  export let size
  // : ButtonProps['size'] 
  = "md";
  export let variant
  // : ButtonProps['variant'] 
  = "primary";
</script>

<Button
  {size}
  {variant}
  on:click
  class={className}
  isIcon={!expanded}
  {...$$restProps}
>
  <!-- expanded prefix icon -->
  <span slot="prefix">
    {#if hasIcon}
      <Icon {...iconProps} />
    {/if}
  </span>

  <!-- content -->
  {#if expanded || !hasIcon}
    <slot />
  {:else}
    <Icon {...iconProps} />
  {/if}
</Button>
