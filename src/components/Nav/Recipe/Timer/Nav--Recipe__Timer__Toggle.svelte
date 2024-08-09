<script>
  import {
    STATES,
    //
    state,
    //
    toggleTimer
  } from ".";
  import {
    WIDGETS,
    //
    isExpanded,
    focusedWidget
  } from "..";
  import Button from "components/Button";
  import Icon from "components/Icon";

  $: showToggle = !$isExpanded && $focusedWidget !== WIDGETS.SCALER;

  $: toggleIcon = $focusedWidget === WIDGETS.TIMER ? "x--20" : "timer--20";

  $: variant = null == $focusedWidget && [STATES.RUNNING, STATES.COMPLETE].includes($state) ? 'primary' : "inverted";

  $: animation = null == $focusedWidget
    ? $state === STATES.RUNNING ? 'pulse'
    : $state === STATES.COMPLETE ? 'toggle'
    : 'none' : 'none';
</script>

{#if showToggle}
  <Button
    {...{
      size: 'xl',
      isIcon: true,
      variant,
      animation
    }}
    on:click={toggleTimer}
  >
    <Icon
      icon={toggleIcon}
      size={20}
    />
  </Button>
{/if}

<style>
  @keyframes timerActive {
    0%, 100% {
      background-color: rgb(var(--colors-accent) / 0);
    }
    50% {
      background-color: rgb(var(--colors-accent) / 0.5);
    }
  }
  :global(.timer--active) {
    animation: timerActive 2000ms linear infinite;
    background-color: rgb(var(--colors-accent) / 1);
  }
</style>