<script>
  import { amount, isUserAuthor } from "store/";
  import _quantity from "utils/text/expressions/quantity";
  import {readonly} from 'store/recipe'
  import { cleanup, value, onInput, setRef } from '.'
  import { onDestroy } from "svelte";

  const placeholder = "# of servings";  

  onDestroy(cleanup)
</script>

<li id="recipe__header__servings">
  {#if $isUserAuthor}
    <input
      id="recipe__header__servings__input"
      type="text"
      bind:value={$value}
      {placeholder}
      on:input={onInput}
      readonly={$readonly}
      use:setRef={'input'}
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
