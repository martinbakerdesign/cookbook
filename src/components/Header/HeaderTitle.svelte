<script>
  import { link } from "svelte-spa-router";
  const version = "pre-alpha";
</script>

<h1 id="header__title"><a href="/" use:link>Cookbook</a></h1>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @import "../../styles/typo";

  #header__title {
    @include font-soehne;
    font-weight: 500;
    font-size: 0.8125rem;
    letter-spacing: calc(0.2 / 13 * 1em);
    line-height: 1rem;
    grid-row: 3 / 4;
    padding: s.$s4 s.$s5;
    grid-column: 1/2;
    grid-row: 1 / 2;
    color: var(--text-primary);

    a {
      color: inherit;
      text-decoration: none;
    }

    .ver {
      @include font-inter;
      font-weight: 400;
    }
  }
</style>
