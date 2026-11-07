<script>
  import Button from "components/Button";

  import { buttonSize, setRefBuilder } from "../";
  import Icon from "components/Icon";
</script>

<Button
  variant="inverted"
  size={$buttonSize}
  isIcon={true}
  label="Undo"
  builders={[setRefBuilder("editorActions.undo")]}
  ><Icon
    icon="undo--12"
    size={12}
  /></Button
>
