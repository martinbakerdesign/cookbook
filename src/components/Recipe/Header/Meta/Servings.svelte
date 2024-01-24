<script>
  import { scaleFactor, amount, isUserAuthor } from "store/";
  import { writable } from "svelte/store";
  import _quantity from "utils/text/expressions/quantity";
  import scaleAmount from "utils/text/scaleAmount";
  import unscaleAmount from "utils/text/unscaleAmount";

  const refs = {
    input: null,
  };
  const placeholder = "# of servings";

  const value = writable($amount);

  $: value.set(scaleAmount($amount, $scaleFactor));

  function onInput() {
    let unscaled = unscaleAmount(refs.input.value, $scaleFactor);
    unscaled !== amount && amount.set(unscaled);
  }
</script>

<li id="recipe__header__servings">
  {#if $isUserAuthor}
    <input
      id="recipe__header__servings__input"
      type="text"
      bind:this={refs.input}
      bind:value={$value}
      {placeholder}
      on:input={onInput}
    />
  {:else}
    {$amount ?? ""}
  {/if}
</li>

<style lang="scss">
  #recipe__header__servings {
    width: 100%;
    white-space: nowrap;

    &,
    &__input {
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      letter-spacing: inherit;
      line-height: 1.5rem;
      color: var(--text-primary);
    }

    &__input {
      color: inherit;
      background-color: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      outline: 0;
      &::placeholder {
        color: inherit;
        opacity: 0.5;
      }
    }
  }
</style>
