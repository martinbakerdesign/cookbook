<script>
  import Button from "components/Button";
  import Icon from "components/Icon";
  import {
    WIDGETS,
    //
    focusedWidget,
  } from "..";
  import {
    showToggle,
    scaleValue,
    //
    toggleScaler,
    showValueInToggle,
  } from ".";

  $: variant = $showValueInToggle ? "primary" : "inverted";
  $: icon = $focusedWidget === WIDGETS.SCALER ? "x" : "scale-recipe";
</script>

{#if $showToggle}
  <Button
    size="xl"
    {variant}
    isIcon={true}
    on:click={toggleScaler}
    class="relative overflow-hidden"
  >
    {#if $showValueInToggle}
      <span
        class="text-heading-md text-text-accent"
      >
        <span class="relative z-10 inline-block">{$scaleValue}x</span>
      </span>
    {:else}
      <Icon
        icon={`${icon}--20`}
        size={20}
        class={$showValueInToggle ? "translate-x-1" : ""}
      />
    {/if}
  </Button>
{/if}

<style>
  .puck:after {
    content: "";
    @apply aspect-square -left-3 -right-3 top-1/2 -translate-y-1/2 rounded-full bg-background-fill-accent absolute;
  }
</style>
