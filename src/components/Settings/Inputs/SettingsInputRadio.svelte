<script>
  import { settings } from "store/";
  import { settingsConfig } from "store/settings";

  import { writable } from "svelte/store";

  export let key = [];

  function inputStore(initial = "") {
    const store = writable(initial);
    const { set: _set, subscribe, update } = store;

    function set(value) {
      settings.set(key, value);
      _set(value);
    }
    return {
      set,
      subscribe,
    };
  }
  const value = inputStore(getNestedValue($settings, key));
</script>

<div class="settings__input--radio">
  {#each settingsConfig[key].options as { value: _value, label }}
    <label>
      <input
        type="radio"
        name={`settings--${key.join("--")}`}
        bind:group={$value}
        value={_value}
      />
      <span>{label}</span>
    </label>
  {/each}
</div>

<style lang="scss">
  @use "../../../styles/_sizes.scss" as s;
  @use "../../../styles/_colours.scss" as c;
  @use "../../../styles/_typo.scss" as t;
</style>
