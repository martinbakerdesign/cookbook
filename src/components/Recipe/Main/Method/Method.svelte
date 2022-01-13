<script>
  import SectionHeader from "../SectionHeader.svelte";
  import Editor from "./Editor.svelte";
</script>

<section class="frame">
  <SectionHeader index={1}>Method</SectionHeader>

  <div class="scrollwindow">
    <Editor />
  </div>
</section>

<style lang="scss">
  @import "../../../../styles/typo.scss";
  @import "../../../../styles/colours.scss";
  @import "../../../../styles/sizes.scss";

  .scrollwindow {
    padding-left: $s6;
    padding-right: $s7;
  }
</style>
