<script>
  import { itemComponents, items, setRecipeId, setHideContextCallback, setItems } from '.'

  export let pos = [0, 0];
  export let show = false;
  
  let defaultItems = []
  export {defaultItems as items};
  $: setItems(defaultItems);
  
  export let recipeId;
  $: setRecipeId(show, recipeId);

  export let hideContext = () => {};
  $: setHideContextCallback(hideContext)

  let width, height, vW, vH;

  $: translateX = pos[0] - (pos[0] + width > vW ? width : 0);
  $: translateY = pos[1] - (pos[1] + height > vH ? width : 0);
</script>

<svelte:window bind:innerWidth={vW} bind:innerHeight={vH} />


  <div
    class="absolute top-0 left-0 rounded-2 p-2 bg-bg-default min-w-max w-110 will-change-transform text-body-sm tracking-loose shadow-lg z-50 bg-background hidden [&[aria-hidden=false]]:block"
    style={`transform: translate3d(${translateX}px, ${translateY}px, 0);`}
    bind:clientWidth={width}
    bind:clientHeight={height}
    hidden={!show}
    aria-hidden={!show}
  >
    <ul
      class="flex flex-col gap-y-1"
      role="menu"
      aria-orientation="vertical"
      dir="ltr"
      tabindex="-1"
    >
      {#each $items as item, index}
        <svelte:component
          this={itemComponents[item.type]}
          {...{ index, ...item }}
        />
      {/each}
    </ul>
  </div>