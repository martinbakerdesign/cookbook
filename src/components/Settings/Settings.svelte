<script>
  import Modal from "components/Modal/Modal.svelte";
  import { settingsConfig, showSettings } from "store/settings";
  import { onDestroy } from "svelte";
  import SettingsAsideItem from "./SettingsAsideItem.svelte";
  import SettingsBlock from "./SettingsBlock.svelte";

  function onEscape(e) {
    if (e.key === "Escape" || e.keyCode === 27) showSettings.set(false);
  }
  function onClickOut(e) {
    if (e.target.closest("#settings") || e.target.closest("#header__settings"))
      return;
    showSettings.set(false);
  }

  $: $showSettings
    ? (window.addEventListener("click", onClickOut),
      window.addEventListener("keyup", onEscape),
      document.querySelector("html") &&
        (document.querySelector("html").style.overflowY = "hidden"))
    : (window.removeEventListener("click", onClickOut),
      window.removeEventListener("keyup", onEscape),
      document.querySelector("html") &&
        (document.querySelector("html").style.overflowY = "auto"));

  onDestroy(() => {
    window.removeEventListener("click", onClickOut);
  });
</script>

<Modal show={$showSettings}>
  <div id="settings" aria-labelledby="settings__aside__heading">
    <aside id="settings__aside">
      <h2 id="settings__aside__heading">Settings</h2>
      <ul id="settings__aside__list">
        {#each Object.entries(settingsConfig) as [key, { type, heading }], index}
          <SettingsAsideItem {type} {heading} {key} {index} />
        {/each}
      </ul>
    </aside>
    <main id="settings__main">
      <ul id="settings__main__list">
        {#each Object.entries(settingsConfig) as [key, { type, heading }], index}
          <SettingsBlock {type} {heading} {key} {index} />
        {/each}
      </ul>
    </main>
  </div>
</Modal>

<style lang="scss">
  @use "../../styles/_sizes" as s;
  @use "../../styles/_colours" as c;

  #settings {
    display: grid;
    grid-template-columns: s.$s9 1fr;
    height: calc(100% - 13.75rem);
    width: calc(100% - 58.25rem);
    min-width: 48rem;
    min-height: 32rem;

    &__aside {
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
    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      padding: 0 s.$s5;

      &__list {
        list-style: none;
      }
    }
  }
</style>
