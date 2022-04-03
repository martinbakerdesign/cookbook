<script>
  import { loading } from "store/";

  import SectionHeader from "../SectionHeader.svelte";
  import Editor from "./Editor.svelte";
</script>

<section id="recipe__method" class="recipe__section" class:loading={$loading}>
  <SectionHeader index={1}>Method</SectionHeader>

  <div class="recipe__section__scrollwindow">
    <Editor />
  </div>
</section>

<style lang="scss">
  @use "../../../../styles/typo" as t;
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;

  @keyframes load {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  #recipe__method {
    &.loading {
      display: block;
      border-radius: 0.75rem;
      background-color: c.$grey-96;
      margin-right: s.$s7;
      margin-left: s.$s6;
      margin-top: s.$s4;
      animation: load 1500ms infinite linear;
      height: calc(100vh - 11.125rem - 4.5rem);
      animation-delay: 500ms;
    }
  }

  .recipe__section__scrollwindow {
    padding-right: s.$s7;
    padding-left: 1.5rem;
  }
</style>
