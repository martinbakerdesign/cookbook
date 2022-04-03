<script>
  import { loading } from "store/";

  import SectionHeader from "../SectionHeader.svelte";
  import Editor from "./Editor.svelte";
  import "./Ingredients.scss";
</script>

<section
  id="recipe__ingredients"
  class="recipe__section"
  class:loading={$loading}
>
  <SectionHeader index={0}>Ingredients</SectionHeader>

  <div class="recipe__section__scrollwindow">
    <Editor />
  </div>
</section>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;
  @import "../../../../styles/typo";

  .recipe__section__scrollwindow {
    padding-left: calc(5.25rem - 1.5rem);
  }

  @keyframes load {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  #recipe__ingredients {
    &.loading {
      display: block;
      border-radius: 0.75rem;
      background-color: c.$grey-96;
      margin-left: s.$s7;
      margin-right: s.$s6;
      margin-top: s.$s4;
      animation: load 1500ms infinite linear;
      height: calc(100vh - 11.125rem - 4.5rem);
    }
  }

  .ingredients {
    &__root {
      font-size: 0.875rem;
      font-weight: 400;
      letter-spacing: calc(0.2 / 14 * 1em);
      line-height: 1rem;

      &:before {
      }
    }
    &__header {
      @include font-soehne;
      font-size: 0.9375rem;
      letter-spacing: calc(0.2 / 15 * 1em);
      line-height: 1.5rem;
      margin-bottom: s.$s3;
      font-weight: 600;
      min-height: 1.5rem;
    }
    &__ingredient {
      margin-bottom: s.$s2;
    }
  }
</style>
