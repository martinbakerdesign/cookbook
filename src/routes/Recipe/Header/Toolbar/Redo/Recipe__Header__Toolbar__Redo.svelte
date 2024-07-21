<script>
  import Icon from "components/Icon";
  import {setRef} from 'store/recipe'

  const label = "Redo";
</script>

<button
  type="button"
  aria-label={label}
  id="recipe__header__toolbar__redo"
  class="recipe__header__toolbar__undo-redo"
  use:setRef={"redo"}
>
  <Icon {...{
    icon: "redo--20",
    size: 20,
    label,
    role: "presentation",
  }} />
</button>

<style lang="scss">
</style>
