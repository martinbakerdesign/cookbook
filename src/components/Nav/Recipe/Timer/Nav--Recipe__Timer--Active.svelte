<script>
    import Button from "components/Button";
    import Icon from "components/Icon";
    import {
        STATES,
        //
        state,
        duration,
        //
        setRef,
        setRefBuilder,
        splitTimeString,
        togglePlayPause,
    } from ".";
    import {
      restart,
      stop
    } from 'store/timer'

    $: [hh, mm, ss] = splitTimeString($duration);

    $: toggleLabel = STATES.PAUSED === $state ? "Resume" : "Pause";

    $: icon = `${STATES.PAUSED === $state ? "play" : "pause"}--20`;

    let hover = false;
</script>

<button
  class="timer-toggle relative rounded-1 min-w-[9rem] overflow-hidden flex-1 bg-background-fill-accent/30 hover:bg-background-fill-accent-hover/30"
  use:setRef={"toggle"}
  aria-label={toggleLabel}
  on:click={togglePlayPause}
  on:mouseenter={() => (hover = true)}
  on:mouseleave={() => (hover = false)}
>
  <span
    role="presentation"
    class="timer-progress inline-block select-none absolute inset-0 w-full h-full origin-left bg-background-fill-accent z-0"
    class:bg-background-fill-accent-hover={hover}
    use:setRef={"toggle_progress"}
  ></span>
  <div
    class="timer-content flex items-center justify-center gap-x-2 fill-icon-accent-on-fill relative z-1 pointer-events-none"
    class:text-text-accent-on-fill-hover={hover}
    class:fill-icon-accent-on-fill-hover={hover}
  >
    <Icon
      {icon}
      size={20}
    />
    <div role="timer" class="text-body-md gap-x-1 text-text-accent-on-fill">
      <span
        class="time-segment"
        suffix="h"
        use:setRef={"toggle_hrs"}>{hh}</span
      >
      <span
        class="time-segment"
        suffix="m"
        use:setRef={"toggle_mins"}>{mm}</span
      >
      <span
        class="time-segment"
        suffix="s"
        use:setRef={"toggle_secs"}>{ss}</span
      >
    </div>
  </div>
</button>
<Button
  variant="secondary"
  size="lg"
  builders={[setRefBuilder("restart")]}
  on:click={restart}
  aria-label="Restart"
  isIcon={true}
>
  <Icon
    icon="restart--20"
    size={20}
  />
</Button>
<Button
  variant="secondary"
  size="lg"
  builders={[setRefBuilder("stop")]}
  on:click={() => stop()}
  aria-label="Stop"
  isIcon={true}
>
  <Icon
    icon="stop--20"
    size={20}
  />
</Button>

<style>
  .time-segment:after {
    content: attr(suffix);
    opacity: 0.6;
  }
  .timer-progress {
    transform: scaleX(var(--progress, 0));
  }
</style>