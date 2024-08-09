<script>
  import { onMount } from "svelte";
  import {
    TimerDefault,
    TimerComplete,
    TimerActive,
    Toggle,
    //
    STATES,
    //
    state,
    //
    setDuration,
    init,
  } from ".";
  import {
    MODES,
    WIDGETS,
    //
    mode,
    isExpanded,
    focusedWidget
  } from "..";

  onMount(init);

  let initDuration = 5*60*1000;
  export { initDuration as duration };

  let started = false;

  $: setDuration(initDuration, started), !started && (started = true);

  $: bgFill =
    STATES.DEFAULT === $state
      ? "bg-background-fill-inverted"
      : STATES.COMPLETE !== $state
        ? "bg-background-fill"
        : "bg-background-fill-accent";
  $: hidden = $mode === MODES.EDIT || !($isExpanded || $focusedWidget === WIDGETS.TIMER);

  $: Component =
    STATES.DEFAULT === $state
      ? TimerDefault
      : STATES.COMPLETE !== $state
        ? TimerActive
        : TimerComplete;
</script>

<div
  class="gap-x-1 rounded-1 p-1 none [&[aria-hidden=false]]:flex {bgFill} {$isExpanded ? 'flex-none' : 'flex-1'}"
  {hidden}
  aria-hidden={hidden}
>
  <svelte:component this={Component} />
</div>

<Toggle />