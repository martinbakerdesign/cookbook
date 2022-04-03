<script>
  export let index = 0;
  const left = index === 0;
  const right = index === 1;
</script>

<div class="header" class:left class:right>
  <h2 class="header__heading"><slot /></h2>
</div>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/typo" as t;
  @use "../../../styles/colours" as c;

  @keyframes load {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .header {
    position: sticky;
    top: 0;
    background-color: var(--bg-primary);
    z-index: 5;
    padding: s.$s4 0 s.$s3;
    // padding-right: s.$s7;
    user-select: none;
    padding-left: 1.5rem;

    // &.left {
    //   padding-left: s.$s7;
    //   padding-right: s.$s6;
    // }

    &__heading {
      opacity: 0.46;
      font-size: 0.625rem;
      font-weight: 400;
      color: var(--text-primary);
      letter-spacing: calc(1.4 / 10 * 1em);
      line-height: 1rem;
      text-transform: uppercase;
    }
  }
</style>
