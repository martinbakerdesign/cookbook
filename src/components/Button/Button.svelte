<script>
  import { Button as ButtonPrimitive } from "bits-ui";
  import {
    iconSlotClasses,
    buttonVariants,
    contentVariants,
    // type ButtonProps,
    // type ContentProps,
    // type ButtonEvents,
  } from ".";
  

  // type $$Props = ButtonProps & ContentProps;
  // type $$Events = ButtonEvents;

  let className
  // : $$Props["class"]
  = undefined;

  $: hasPrefix = null != $$slots.prefix;
  $: showPrefix = hasPrefix && !isIcon;
  $: hasSuffix = null != $$slots.suffix;
  $: showSuffix = hasSuffix && !isIcon;

  $: rootClassname = buttonVariants({
    variant,
    size,
    className,
    isIcon
  });
  $: contentClassname = contentVariants({
    size,
    isIcon,
  });

  export { className as class };
  export let variant
  // : $$Props["variant"]
  = "primary";
  export let size
  // : $$Props["size"]
  = "md";
  export let isIcon
  // : $$Props["isIcon"]
  = false;
  export let builders
  // : $$Props["builders"]
  = [];
</script>

<ButtonPrimitive.Root
  {builders}
  type="button"
  class={rootClassname}
  {...$$restProps}
  on:click
  on:keydown
>
{#if showPrefix}
  <span
    class={iconSlotClasses}
  ><slot name="prefix" /></span
  >
  {/if}

  <span class={contentClassname}>
    <slot />
  </span>

  {#if showSuffix}
  <span
    class={iconSlotClasses}
  ><slot name="suffix" /></span
  >
  {/if}
</ButtonPrimitive.Root>
