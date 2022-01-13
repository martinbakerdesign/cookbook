<script>
  import { name, loading } from "store/";
  export let min = false;
</script>

<input
  bind:value={$name}
  class:min
  placeholder={!$loading ? "My recipe" : "Loading..."}
/>

<style lang="scss">
  @import "../../../styles/_colours.scss";
  @import "../../../styles/_sizes.scss";
  @import "../../../styles/_typo.scss";

  input {
    @include font-soehne;
    font-size: 2.25rem;
    color: $black;
    letter-spacing: calc(-0.4 / 40 * 1em);
    line-height: 2.5rem;
    font-weight: 500;
    outline: none;
    box-shadow: none;
    border: 0;
    margin-bottom: $s4;
    background-color: transparent;
    width: 100%;
    height: 3rem;

    &.min {
      font-size: 1.125rem;
      line-height: 1.5rem;
      margin-bottom: 0;
      flex: 1;
      height: 1.75rem;
    }
    &::placeholder {
      opacity: 0.5;
    }
  }
</style>
