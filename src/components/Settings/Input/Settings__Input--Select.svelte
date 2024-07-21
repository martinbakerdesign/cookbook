<script>
  import { writable } from "svelte/store";
  import { settings } from "store";
  import { getNestedValue, settingsConfig } from "store/settings";
  import {Select} from "components/Inputs";

  export let key = '';

  const options = getNestedValue(settingsConfig, key)?.options ?? [];

  function inputStore(initial = "") {
    const store = writable(initial);
    const { set: _set, subscribe, update: _update } = store;

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

<Select
  {...{
    value: $value,
    id: `settings__${key.split('.').join("--")}`,
    options,
    className: "settings__input--select",
  }}
/>
<div class="settings__input--select">
  <!-- <select bind:value={$value}>
    {#each options as { value, label }}
      <option {value}>{label}</option>
    {/each}
  </select> -->
</div>
