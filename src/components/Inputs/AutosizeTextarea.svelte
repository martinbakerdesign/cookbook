<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import getStyles from "utils/dom/getStyles";

  export let value = writable("");
  export let id = "";
  export let name = "";
  export let placeholder = "";

  let ref;

  let style;

  onMount(() => {
    ref.children[0] && (style = getTextStyles(ref.children[0]));
  });

  function getTextStyles(el) {
    return getStyles(el, [
      "font-family",
      "font-size",
      "font-weight",
      "font-style",
      "color",
      "letter-spacing",
      "line-height",
    ]);
  }
</script>

<div class="textarea-autosize" {style}>
  <div
    class="textarea-autosize__spacer"
    hidden
    aria-hidden="true"
    bind:this={ref}
  >
    <slot />
  </div>
  <textarea
    {name}
    {id}
    bind:value={$value}
    {placeholder}
    class="textarea-autosize__input"
  />
</div>

<style lang="scss">
  .textarea-autosize {
    position: relative;

    &__spacer {
      display: block;
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
    &__input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      outline: 0;
      border: 0;
      padding: 0;
      margin: 0;
      background-color: transparent;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-style: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
      resize: none;

      &::placeholder {
        color: inherit;
        opacity: 0.5;
      }
    }
  }
</style>
