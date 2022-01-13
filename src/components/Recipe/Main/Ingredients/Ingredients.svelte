<script>
  import SectionHeader from "../SectionHeader.svelte";
  import Editor from "./Editor.svelte";
</script>

<section class="frame">
  <SectionHeader index={0}>Ingredients</SectionHeader>

  <div class="scrollwindow">
    <Editor />
  </div>
</section>

<style lang="scss">
  @import "../../../../styles/sizes.scss";
  @import "../../../../styles/typo.scss";
  @import "../../../../styles/colours.scss";

  .scrollwindow {
    padding-left: $s7;
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
      margin-bottom: $s3;
      font-weight: 600;
      min-height: 1.5rem;
    }
    &__ingredient {
      margin-bottom: $s2;
    }
  }
</style>
