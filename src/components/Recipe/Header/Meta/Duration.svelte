<script>
  import { duration } from "store/";
  import user from "store/user";
</script>

{#if $user != null}
  <div
    bind:textContent={$duration.text}
    contenteditable="true"
    placeholder="1 hour"
    id="recipe__header__duration"
  />
{:else}
  <div placeholder="1 hour" id="recipe__header__duration">{$duration.text}</div>
{/if}

<style lang="scss">
  @import "../../../../styles/_colours.scss";
  @import "../../../../styles/_sizes.scss";

  #recipe__header__duration {
    color: var(--text-primary);

    &[contenteditable="true"] {
      outline: 0;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      letter-spacing: inherit;
      outline: 0;
      border: 0;
      background-color: transparent;
    }
    &[placeholder]:empty:before {
      content: attr(placeholder);
      cursor: text;
      opacity: 0.5;
    }
  }
</style>
