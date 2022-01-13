<script>
  import { onDestroy, onMount } from "svelte";
  import { writable } from "svelte/store";
  import animDefs from "./animDefs";

  export let animation = "";
  export let fps = 12;
  export let size = 64;
  export let fill = "#000";
  const viewbox = animation.includes("--")
    ? animation.split("--")[animation.split("--").length - 1]
    : 64;
  const frames = animDefs[animation] ?? null;
  let it = 0;
  let interval;
  const frame = writable(frames[it]);

  onMount(() => {
    if (frames) {
      interval = setInterval(onInterval, 1000 / fps);
    }
  });
  onDestroy(() => {
    clearInterval(interval);
    interval = null;
  });

  function onInterval() {
    it = (it + 1) % frames.length;
    frame.set(frames[it]);
  }
</script>

<svg
  height={size}
  width={size}
  viewBox={`0 0 ${viewbox} ${viewbox}`}
  style={`fill: ${fill}`}
>
  {#if frames}
    <path d={$frame} />
  {/if}
</svg>

<style lang="scss"></style>
