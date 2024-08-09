<script>
  import { setRef } from "store/recipe";
  import {
    Option,
    //
    refs,
    options,
    //
    currentIndex,
    thumbWidth,
    thumbTranslateX,
    //
    getOptionClickHandler,
  } from ".";
  
  $: hidden = !$options || $options.length < 2;

  function getOptionId(value) {
    return `block-type--${value.split(" ").join("-")}`;
  }
</script>

<div
    class="rounded-1 bg-background-fill-inverted p-1 relative w-[11.5rem] none aria-[hidden=false]:flex"
    bind:this={refs.outer}
    {hidden}
    aria-hidden={hidden}
>
<span
    data-thumb
    class="rounded-1 bg-background-fill absolute z-0 inline-block left-1 top-1 bottom-1 transition-transform duration-100"
    style="width: {$thumbWidth}px; transform: translateX({$thumbTranslateX}px)"
    bind:this={refs.thumb}
></span>

<span
    class="flex flex-1 gap-x-1"
    bind:this={refs.optionsContainer}
>
    {#each $options as option, index}
    <Option
        value={option.type}
        id={getOptionId(option.type)}
        checked={index === $currentIndex}
        on:click={getOptionClickHandler(index)}>{option.name}</Option
    >
    {/each}
</span>
</div>
