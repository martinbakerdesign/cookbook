<script>
  import Button from "components/Button";
  import Icon from "components/Icon";
  import { setRefBuilder } from "../..";
</script>

<Button
  variant="secondary"
  size="lg"
  isIcon={false}
  label="Insert degrees symbol"
  builders={[setRefBuilder("editorActions.degrees")]}
  class="flex-none"
>
  <Icon
    icon="degrees--12"
    size={12}
    slot="prefix"
  />
  Insert degrees symbol
</Button>
