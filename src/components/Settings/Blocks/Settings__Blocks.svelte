<script>
  import { settingsConfig } from "store/settings";
  import { Block, getBlockConfig } from ".";
</script>

<main id="settings__main">
  <ul id="settings__main__list">
    {#each Object.entries(settingsConfig) as [key, config], index}
      <Block {...getBlockConfig(config, key, index)} />
    {/each}
  </ul>
</main>

<style lang="scss">
  @use "../../../styles/_sizes" as s;
  @use "../../../styles/_colours" as c;

  #settings__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 s.$s5;

    &__list {
      list-style: none;
    }
  }
</style>
