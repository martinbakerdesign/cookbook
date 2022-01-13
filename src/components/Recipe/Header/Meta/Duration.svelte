<script>
  import { duration } from "store/";
</script>

<div
  bind:textContent={$duration.text}
  contenteditable="true"
  placeholder="1 hour"
/>

<style lang="scss">
  @import "../../../../styles/_colours.scss";
  @import "../../../../styles/_sizes.scss";

  [contenteditable="true"] {
    outline: 0;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    letter-spacing: inherit;
    outline: 0;
    border: 0;
    background-color: transparent;
  }
  [placeholder]:empty:before {
    content: attr(placeholder);
    cursor: text;
    opacity: 0.5;
  }
  // [placeholder]:empty:focus:before {
  //   opacity: 0;
  // }
</style>
