<script>
  export let heading = "Settings Block";
  export let type = "TEXT";
  export let key = "";
  export let index;
  import InputText from "./Inputs/SettingsInputText.svelte";
  import InputSelect from "./Inputs/SettingsInputSelect.svelte";
  import InputSwitch from "components/Inputs/Switch.svelte";
  import InputRadio from "./Inputs/SettingsInputRadio.svelte";
  import { settingsConfig, settingsFocus } from "store/settings";
  import { settings } from "store/";

  let Input = (function () {
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
  })();
  const inputProps = {
    key,
    ...(type === "SWITCH" && {
      initialValue: $settings[key],
      onToggle: onSwitchToggle,
      label: settingsConfig[key].heading,
      id: `settings--${key}`,
    }),
  };
  function onSwitchToggle(value) {
    settings.set(key, value);
  }
</script>

<li
  class="settings__block"
  id={`settings__${key}`}
  data-index={index}
  data-focus={$settingsFocus === index}
>
  <h3 class="settings__block__heading">{heading}</h3>
  <Input {...inputProps} />
</li>

<style lang="scss">
  @use "../../styles/_sizes" as s;
  @use "../../styles/_colours" as c;
  @use "../../styles/_typo" as t;

  .settings__block {
    padding: s.$s5 0;
    position: relative;

    &:first-child {
      padding-top: s.$s6;
    }

    &:after {
      content: "";
      pointer-events: none;
      user-select: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--border);
    }
    &:last-child {
      padding-bottom: s.$s6;
      &:after {
        content: none;
      }
    }

    &__heading {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: s.$s3;
    }

    &[data-focus="true"] {
      color: c.$accent;
    }
  }
</style>
