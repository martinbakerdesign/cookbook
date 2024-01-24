<script>
  import { writable } from "svelte/store";
  import { scaleFactor, amount } from "store/";
  import scaleAmount from "utils/text/scaleAmount";
  import Icon from "components/Icon/Icon.svelte";
  import { getContext } from "svelte";
  import scaleRecipe from "utils/recipes/scale";
  import stateFromRecipe from "utils/prosemirror/recipe/stateFromRecipe";
  import recipe from "store/";

  const focus = writable(false);
  const suggestions = writable(getSuggestions($scaleFactor, $amount));

  const { getView } = getContext("recipe");
  const view = getView();

  let showOptions = false;

  $: $suggestions = getSuggestions($scaleFactor, $amount);
  $: scale(+$scaleFactor);

  function scale(scaleFactor) {
    if (!view) return;
    let scaled = scaleRecipe($recipe, +scaleFactor);
    let newState = stateFromRecipe(scaled);
    view.updateState(newState);
  }

  const iconProps = {
    icon: "scale--24",
    size: 20,
    label: "Scale recipe",
    role: "presentation",
  };

  function toggleFocus({ type, relatedTarget }) {
    focus.set(
      type === "focus" ||
        (relatedTarget &&
          relatedTarget.closest("#recipe__header__toolbar__scale__suggestions"))
    );
  }

  function getSuggestions(scaleFactor, amount) {
    let value, scaled, active;

    return new Array(8).fill(0).map((v, i) => {
      value = i < 3 ? 1 / Math.pow(2, 3 - i) : i - 2;
      scaled = scaleAmount(amount, value);
      active = value === parseFloat(scaleFactor);

      return {
        value,
        scaled,
        active,
      };
    });
  }
  function onSuggestionClick({ target }) {
    let value = +target.closest("button").dataset.value;
    $scaleFactor = value.toFixed(value >= 1 ? 1 : 2);
    $focus = false;
  }
  function onMinus() {
    onIncrement(-1);
  }
  function onPlus() {
    onIncrement(1);
  }
  function onIncrement(incrementBy) {
    let scaleFactorValue = parseFloat($scaleFactor);
    let value = Math.max(0, scaleFactorValue + incrementBy);
    $scaleFactor = value.toFixed(value >= 1 ? 1 : 2);
  }
  function onOptionsToggle () {
    showOptions = !showOptions;
  }
</script>

<div id="recipe__header__toolbar__scale">
  <Icon {...iconProps} />
  <div id="recipe__header__toolbar__scale__input">
    <button
      class="scale__increment"
      type="button"
      id="scale__down"
      on:click={onMinus}
      aria-label="Scale Down"
    >
      <Icon
        {...{
          icon: "scale-down--24",
          label: "Scale Down",
          size: 24,
        }}
      />
    </button>
    <input
      type="number"
      bind:value={$scaleFactor}
      placeholder="1.0"
      min="0"
      on:focus={toggleFocus}
      on:blur={toggleFocus}
    />
    <button
      id="scale__up"
      class="scale__increment"
      type="button"
      on:click={onPlus}
      aria-label="Scale Up"
    >
      <Icon
        {...{
          icon: "scale-up--24",
          label: "Scale Up",
          size: 24,
        }}
      />
    </button>
    <button
      class="scale__options"
      type="button"
      id="scale__options"
      on:click={onOptionsToggle}
      aria-label="Options"
    >
      <Icon
        {...{
          icon: "options--24",
          label: "Options",
          size: 24,
        }}
      />
    </button>
    {#if showOptions}
    {/if}
    {#if $focus}
      <ul id="recipe__header__toolbar__scale__suggestions">
        {#each $suggestions as suggestion}
          <li tabindex="-1">
            <button
              type="button"
              on:click={onSuggestionClick}
              class:active={suggestion.active}
              data-value={suggestion.value}
            >
              <span class="value"
                >{suggestion.value.toFixed(suggestion.value >= 1 ? 1 : 2)}</span
              >
              <span class="scaled">{suggestion.scaled}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;

  #recipe__header__toolbar__scale {
    display: flex;
    align-items: center;

    &__input {
      margin-left: s.$s2;
      display: grid;
      grid-template-columns: 1fr auto 1fr auto;
      border-radius: 0.25rem;
      border: 1px solid var(--border);
      color: var(--text-primary);
      position: relative;
    }

    button {
      font-family: inherit;
      outline: 0;
      border: 0;
      background-color: transparent;
      padding: 0;
      margin: 0;
      color: inherit;

      &:focus-visible,
      &:hover {
        background-color: var(--bg-secondary);
      }
    }
    .scale__increment,
    .scale__options {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.875rem;
      line-height: 1.5rem;
      font-weight: 600;
    }
    input {
      color: inherit;
      border: 0;
      border-left: 1px solid var(--border);
      border-right: 1px solid var(--border);
      outline: 0;
      appearance: none;
      display: block;
      font-family: inherit;
      font-size: 0.8125rem;
      letter-spacing: 0;
      text-align: center;
      line-height: 1.25rem;
      padding: 0.125rem 0;
      background-color: transparent;
      width: 3rem;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &__suggestions {
      font-size: 0.75rem;
      position: absolute;
      left: 50%;
      top: calc(100% + 0.25rem);
      transform: translateX(-50%);
      border-radius: 0.25rem;
      background-color: var(--bg-primary);
      border: 1px solid var(--border);
      list-style: none;
      padding: s.$s1;
      margin: 0;
      box-shadow: 0px s.$s1 0.5rem 0 rgba(63, 60, 58, 0.35);

      li {
        margin-bottom: s.$s1;
        &:last-child {
          margin-bottom: 0;
        }

        button {
          cursor: default;
          display: block;
          width: 100%;
          padding: 0 s.$s5;
          font-size: 0.75rem;
          line-height: 1.5rem;
          text-align: left;
          white-space: nowrap;
          border-radius: 0.25rem;
          display: grid;
          grid-template-columns: 1.75rem 1fr;
          grid-column-gap: s.$s4;

          span {
            display: inline-block;
          }
          .value {
            text-align: right;
          }
          .scaled {
            font-style: italic;
            font-size: 0.6875rem;
            letter-spacing: calc(0.1 / 11 * 1em);
            display: inline-block;
          }

          &.active {
            background-color: var(--accent);
            color: var(--black);
            font-weight: 600;
          }
        }
      }
    }
    #scale {
      &__down {
      
      }
      &__up {
      }
      &__options {
        border-left: 1px solid var(--border);
        width: 1.5625rem;
      }
    }
  }
  :global(#recipe__header__toolbar__scale > .icon) {
    flex: none;
    width: 1.25rem;
    height: 1.25rem;
    fill: var(--text-secondary);
  }
  :global(#recipe__header__toolbar__scale button .icon) {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--text-primary);
  }
</style>
