<script>
  import Button from "components/Button";
  import Icon from "components/Icon";
  import {amount} from 'store/index'
  import {
    MODES,
    WIDGETS,
    //
    mode,
    isExpanded,
    focusedWidget,
  } from "..";
  import {
    Toggle,
    Suggestions,
    //
    refs,
    focus,
    scaleValue,
    yieldValue,
    yieldSuffix,
    //
    decrease,
    increase,
    onScaleChange,
    onYieldChange,
    toggleFocus
  } from ".";

  $: hidden = !($isExpanded || $focusedWidget === WIDGETS.SCALER);
</script>

<div
  class="rounded-1 relative bg-background-fill-inverted p-1 gap-1 none [&[aria-hidden=false]]:flex {!$isExpanded
    ? 'flex-1'
    : 'flex-none'}"
  {hidden}
  aria-hidden={hidden}
>
  <div class="px-2 flex-none flex items-center fill-icon">
    <Icon
      icon="scale-recipe--20"
      size={20}
    />
  </div>
  <Button
    variant="outline"
    size="lg"
    on:click={decrease}
    isIcon={true}
    disabled={parseFloat($scaleValue) <= 1}
  >
    <Icon
      icon="minus--20"
      size={20}
    />
  </Button>
  <div class="flex-1 rounded-1 border flex items-center justify-center gap-2 font-regular min-w-42 cursor-text" bind:this={refs.inputContainer} on:click={() => refs.input.focus()}>
    <span class="input text-text text-body-lg flex-1 inline-flex text-center p-4 gap-x-1 justify-center cursor-text outline-none" data-suffix={"x"} contenteditable on:input={onScaleChange} bind:this={refs.input} on:focus={toggleFocus} on:blur={toggleFocus}>{$scaleValue}</span>
    
    {#if $amount?.unit}
    <span class="input text-text-secondary text-body-md flex-grow-1 flex-shrink-0 inline-flex text-center p-4 gap-x-1 justify-center select-none pointer-events-none pl-0" data-suffix={$yieldSuffix}>
      {[$yieldValue].flat().join(' - ')}
    </span>
    {/if}
  </div>
  <Button
    variant="outline"
    size="lg"
    on:click={increase}
    isIcon={true}
  >
    <Icon
      icon="plus--20"
      size={20}
    />
  </Button>
  {#if $focus}
    <Suggestions />
  {/if}
</div>

<Toggle />


<style>
  .input:after {
    content: attr(data-suffix);
  }
</style>