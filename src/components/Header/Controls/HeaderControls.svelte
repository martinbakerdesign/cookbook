<script>
  import Settings from "./HeaderSettingsButton.svelte";
  import User from "./User/HeaderControlsUser.svelte";
</script>

<section id="header__controls">
  <Settings />
  <User />
</section>

<style lang="scss">
  @use "../../../styles/colours" as c;
  @use "../../../styles/sizes" as s;

  #header__controls {
    height: 3.5rem;
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    padding: 0 s.$s5;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: s.$s3;
  }
</style>
