<script>
  import {state, statusLabel, stateIcons, init} from '.'
  import { onDestroy } from 'svelte';

  export let size = 24;

  onMount(init);
</script>

<div id="recipe__status">
  {#if null != $statusLabel}
    <span id="recipe__status__text">{$statusLabel}</span>
  {/if}
  <svg
    id="recipe__status__icon"
    width={size}
    height={size}
    viewBox={`0 0 24 24`}
    data-state={state}
  >
    <path d={stateIcons[$state]} />
  </svg>
</div>

<style lang="scss">
  @use "../../../../../styles/sizes" as s;
  @use "../../../../../styles/colours" as c;
  @use "../../../../../styles/typo" as t;

  #recipe__status {
    // position: fixed;
    // top: $s6;
    // right: $s6;
    display: flex;
    // flex-direction: row-reverse;
    align-items: center;
    font-size: 0.8125rem;
    line-height: 1.5rem;
    white-space: nowrap;
    flex-wrap: nowrap;
    width: 8rem;
    justify-content: flex-end;
    margin-left: s.$s5;
    flex: none;

    &__icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-left: s.$s2;
      flex: none;

      &[data-state="0"] {
        fill: var(--success);
      }
      &[data-state="1"] {
        fill: #88cdf8;
      }
    }
    &__text {
      color: var(--text-secondary);
    }
  }
</style>
