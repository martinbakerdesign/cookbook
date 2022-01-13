<script>
  import Settings from "./HeaderSettingsButton.svelte";
  import User from "./User/HeaderControlsUser.svelte";
</script>

<section id="header__controls">
  <Settings />
  <User />
</section>

<style lang="scss">
  @import "../../../styles/colours.scss";
  @import "../../../styles/sizes.scss";
  @import "../../../styles/typo.scss";

  #header__controls {
    height: 3.5rem;
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    padding: 0 $s5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: $s3;
  }
</style>
