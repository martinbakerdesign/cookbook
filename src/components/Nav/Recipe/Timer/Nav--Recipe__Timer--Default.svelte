<script>
  import Button from "components/Button";
  import Icon from "components/Icon";
  import {
    duration,
    //
    refs,
    //
    setRef,
    setRefBuilder,
    onDurationInput,
    onDurationKeypress,
    onDurationChange,
    splitTimeString,
    startTimer,
  } from ".";

  $: [hh, mm, ss] = splitTimeString($duration);
  $: inputs = [
    { suffix: "h", key: "hrs", value: hh, pattern: "^[0-9]{1,9}$" },
    { suffix: "m", key: "mins", value: mm, pattern: "^[0-5][0-9]$" },
    { suffix: "s", key: "secs", value: ss, pattern: "^[0-5][0-9]$" },
  ];
</script>

<div class="flex justify-center items-center h-full w-16 fill-icon">
  <Icon
    icon="timer--20"
    size={20}
  />
</div>

<div
  class="time-input rounded-1 border flex items-center flex-1"
  bind:this={refs.input}
  use:setRef={"input"}
>
  {#each inputs as { suffix, key, value, pattern }}
    <span
      class="time-segment border-r last:border-r-0 h-full flex-1 inline-flex items-center justify-center min-w-[3rem] cursor-text px-4"
      contenteditable
      inputmode="numeric"
      {suffix}
      on:input={onDurationInput}
      on:keydown={onDurationKeypress}
      data-name={key}
      bind:this={refs[`input_${key}`]}
      {pattern}
    >{value}</span>
  {/each}
</div>

<Button
  variant="outline"
  size="lg"
  isIcon={true}
  builders={[setRefBuilder("playpause")]}
  on:click={startTimer}
  aria-label="Start"
  class="flex-none"
>
  <Icon
    icon="play--20"
    size={20}
  />
</Button>

<style>
  .time-segment:after {
    content: attr(suffix);
    color: rgb(var(--colors-text-secondary));
  }
</style>
