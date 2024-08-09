<script>
  import { settingsConfig } from "store/settings";
  import { Item } from ".";
</script>

<aside id="settings__aside">
  <h2 id="settings__aside__heading">Settings</h2>
  <ul id="settings__aside__list">
    {#each Object.entries(settingsConfig) as [key, { type, heading }], index}
      <Item {...{ type, heading, key, index }} />
    {/each}
  </ul>
</aside>

<style lang="scss">
  @use "../../../styles/_sizes" as s;
  @use "../../../styles/_colours" as c;

  #settings__aside {
    background-color: var(--bg-secondary);
    padding: s.$s4 s.$s3;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    // border-right: 1px solid ;

    &__heading {
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0 s.$s2 s.$s5;
      color: var(--text-primary);
      opacity: 0.55;
    }
    &__list {
      list-style: none;
      // height: 200vh;
    }

    &::-webkit-scrollbar {
      width: 1rem;
      background: none;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
      border: 0;
    }
    &::-webkit-scrollbar-thumb {
      background: c.$grey-63;
      border-radius: 0;
      border: 0.375rem solid transparent;
      border-top-width: s.$s4;
      border-bottom-width: s.$s4;
      background-clip: content-box;

      &:hover {
        background: c.$grey-52;
        border: 0.375rem solid transparent;
        border-top-width: s.$s4;
        border-bottom-width: s.$s4;
        background-clip: content-box;
      }
    }
  }
</style>
