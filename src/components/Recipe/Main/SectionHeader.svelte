<script>
  export let index = 0;
  let left = index === 0;
  let right = index === 1;
</script>

<div class="header" class:left={index === 0} class:right={index === 1}>
  <h2><slot /></h2>
</div>

<style lang="scss">
  @import "../../../styles/_sizes.scss";
  @import "../../../styles/_typo.scss";
  @import "../../../styles/_colours.scss";

  .header {
    padding: $s4 $s6 $s3;
    padding-right: $s7;

    &.left {
      padding-left: $s7;
      padding-right: $s6;
    }
  }
  h2 {
    opacity: 0.46;
    font-size: 0.625rem;
    font-weight: 400;
    color: #110e12;
    letter-spacing: calc(1.4 / 10 * 1em);
    line-height: 1rem;
    text-transform: uppercase;
  }
</style>
