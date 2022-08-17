<script>
  import { scaleFactor, amount, isUserAuthor } from "store/";
  import { writable } from "svelte/store";
  import _quantity from "utils/text/expressions/quantity";
  import scaleAmount from "utils/text/scaleAmount";
  import unscaleAmount from "utils/text/unscaleAmount";

  let inputRef;
  const value = writable($amount);

  $: value.set(scaleAmount($amount, $scaleFactor));

  function onInput() {
    amount.set(unscaleAmount(inputRef.innerHTML, $scaleFactor));
  }
</script>

{#if $isUserAuthor != null}
  <div
    contenteditable="true"
    bind:innerHTML={$value}
    placeholder="1 serving"
    id="recipe__header__servings"
    on:input={onInput}
    bind:this={inputRef}
  />
{:else}
  <div placeholder="1 serving" id="recipe__header__servings">
    {$amount.text}
  </div>
{/if}

<style lang="scss">
  #recipe__header__servings {
    color: var(--text-primary);
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    letter-spacing: inherit;
    line-height: 1.5rem;
    outline: 0;
    border: 0;
    background-color: transparent;

    &[placeholder]:empty:before {
      content: attr(placeholder);
      opacity: 0.5;
      cursor: text;
    }
  }
</style>
