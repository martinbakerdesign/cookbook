<script>
  import { pushing, lastSaved } from "store/";
  import { writable } from "svelte/store";

  const states = [
    "m12.5 3.5a7.003 7.003 0 0 1 6.84 5.503l.16-.003a4.5 4.5 0 1 1 -.5 8.973v.027h-15a4 4 0 1 1 1.503-7.708 7 7 0 0 1 6.997-6.792zm2.5 4.793-4.293 4.292-1.793-1.792-1.414 1.414 3.207 3.207 5.707-5.707z", // saved
    "M12.5 3.5a7.003 7.003 0 0 1 6.84 5.503L19.5 9a4.5 4.5 0 1 1-.5 8.973V18h-3.8v-3H17l-4.5-5L8 15h1.8v3H4a4 4 0 1 1 1.503-7.708A7 7 0 0 1 12.5 3.5z", // saving
  ];
  export let size = 24;
  let state = 0;
  let timeout;
  const displayStr = writable(null);
  $: state = $pushing ? 1 : 0;
  $: clearTimeout(timeout),
    displayStr.set($pushing ? "Saving..." : $lastSaved ? "Saved" : null);
  $: $displayStr &&
    (timeout = setTimeout(() => {
      displayStr.set(null);
    }, 2000));
</script>

<div id="recipe__status">
  <svg
    id="recipe__status__icon"
    width={size}
    height={size}
    viewBox={`0 0 24 24`}
    data-state={state}
  >
    <path d={states[state]} />
  </svg>
  {#if $displayStr}
    <span id="recipe__status__text">{$displayStr}</span>
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/sizes.scss";
  @import "../../../styles/typo.scss";
  @import "../../../styles/colours.scss";

  #recipe__status {
    // position: fixed;
    // top: $s6;
    // right: $s6;
    display: flex;
    // flex-direction: row-reverse;
    align-items: center;
    font-size: 0.8125rem;
    line-height: 1.5rem;

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: $s2;

      &[data-state="0"] {
        fill: $success;
      }
      &[data-state="1"] {
        fill: #9bc5ff;
      }
    }
    &__text {
      color: $grey-52;
    }
  }
</style>
