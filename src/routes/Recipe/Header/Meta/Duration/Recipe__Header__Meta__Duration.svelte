<script>
  import { duration } from "store/";
  import {readonly} from 'store/recipe'

  const placeholder = "Duration";
</script>

<li id="recipe__header__duration">
  <input
    id="recipe__header__duration__input"
    type="text"
    bind:value={$duration.text}
    {placeholder}
    readonly={$readonly}
  />
</li>

<style lang="scss">
  #recipe__header__duration {
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
