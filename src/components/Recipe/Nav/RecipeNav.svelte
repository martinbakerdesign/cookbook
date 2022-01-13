<script>
  import MenuButton from "./MenuButton.svelte";
</script>

<nav id="recipe__nav">
  <MenuButton />
</nav>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/typo" as t;
  @use "../../../styles/colours" as c;
  @use "../../../styles/layers" as l;

  #recipe__nav {
    position: fixed;
    left: s.$s5;
    top: 50%;
    transform: translateY(-50%);
    z-index: l.$aside;
  }
</style>
