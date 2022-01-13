<script>
  import { amount } from "store/";
</script>

<div
  contenteditable="true"
  bind:innerHTML={$amount.text}
  placeholder="1 serving"
/>

<style lang="scss">
  @import "../../../../styles/_colours.scss";
  @import "../../../../styles/_sizes.scss";
  @import "../../../../styles/typo.scss";

  [placeholder]:empty:before {
    content: attr(placeholder);
    opacity: 0.5;
    cursor: text;
  }
  // [placeholder]:empty:focus:before {
  //   opacity: 0;
  // }
  div {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    letter-spacing: inherit;
    line-height: 1.5rem;
    outline: 0;
    border: 0;
    background-color: transparent;
  }
</style>
