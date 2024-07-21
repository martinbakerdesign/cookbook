<script>
  import { settings } from "store";
  import {
    getNestedValue,
  } from "store/settings";

  import {Radio, Text, Select} from '.'
  import {Switch} from "components/Inputs";

  export let key = '';
  export let type = "TEXT";

  const Input = (function (type) {
    switch (type) {
      default:
      case "TEXT":
        return Text;
      case "SELECT":
        return Select;
      case "SWITCH":
        return Switch;
      case "RADIO":
        return Radio;
    }
  })(type);

  const inputProps = {
    key,
    ...(type === "SWITCH" && {
      initialValue: getNestedValue($settings, key),
      onToggle: onSwitchToggle,
      id: `settings--${key}`,
    }),
  };

  function onSwitchToggle(value) {
    settings.set(key, value);
  }
</script>

<svelte:component this={Input} {...inputProps} />
