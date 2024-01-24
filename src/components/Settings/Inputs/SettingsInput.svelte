<script>
  import {
    getNestedValue,
    settingsConfig,
    settingsFocus,
  } from "store/settings";
  import { settings } from "store/";

  import InputSwitch from "components/Inputs/Switch.svelte";
  import InputText from "components/Settings/Inputs/SettingsInputText.svelte";
  import InputSelect from "components/Settings/Inputs/SettingsInputSelect.svelte";
  import InputRadio from "components/Settings/Inputs/SettingsInputRadio.svelte";

  export let key = [];
  export let type = "TEXT";

  const Input = (function (type) {
    switch (type) {
      default:
      case "TEXT":
        return InputText;
      case "SELECT":
        return InputSelect;
      case "SWITCH":
        return InputSwitch;
      case "RADIO":
        return InputRadio;
    }
  })(type);

  const inputProps = {
    key,
    ...(type === "SWITCH" && {
      initialValue: getNestedValue($settings, key),
      onToggle: onSwitchToggle,
      id: `settings--${key.join("--")}`,
    }),
  };

  function onSwitchToggle(value) {
    settings.set(key, value);
  }
</script>

<Input {...inputProps} />
