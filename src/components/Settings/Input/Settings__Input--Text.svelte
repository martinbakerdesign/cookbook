<script>
  import { settings } from "store/";
  import getNestedValue from "utils/getNestedValue";

  import { writable } from "svelte/store";

  export let key = [];

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

<div class="settings__input--text">
  <input type="text" bind:value={$value} />
</div>