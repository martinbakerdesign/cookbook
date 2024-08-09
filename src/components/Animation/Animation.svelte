<script>
  import { onDestroy } from "svelte";
  import { animFrames, getViewbox, start, cleanup, frame } from '.'

  export let animation = "";
  export let fps = 12;
  export let size = 64;
  export let fill = "#000";

  $: viewbox = getViewbox(animation);
  $: frames = animFrames[animation] ?? null;
  $: start(frames, fps);

  onDestroy(cleanup);
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
