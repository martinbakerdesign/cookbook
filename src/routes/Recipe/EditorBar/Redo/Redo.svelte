<script>
  import Button from "components/Button";
  import { buttonSize, setRefBuilder } from "../";
  import Icon from "components/Icon";
</script>

<Button
  variant="inverted"
  size={$buttonSize}
  isIcon={true}
  label="Redo"
  builders={[setRefBuilder("editorActions.redo")]}
  ><Icon
    icon="redo--12"
    size={12}
  /></Button
>
