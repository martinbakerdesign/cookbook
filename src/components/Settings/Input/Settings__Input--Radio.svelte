<script>
  import { settings } from "store/";
  import { settingsConfig } from "store/settings";
  import {inputStore} from '.'
  import getNestedValue from "utils/getNestedValue";

  export let key = '';

  const value = inputStore(key, getNestedValue($settings, key));
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