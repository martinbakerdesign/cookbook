<script>
  import Button from "components/Button";
  import { setRefBuilder } from "../..";
</script>

<Button
  variant="secondary"
  size="lg"
  isIcon={false}
  label="Use unit shorthands"
  builders={[setRefBuilder("editorActions.shorthand")]}
  class="flex-none"
>
  Use unit shorthands
</Button>
