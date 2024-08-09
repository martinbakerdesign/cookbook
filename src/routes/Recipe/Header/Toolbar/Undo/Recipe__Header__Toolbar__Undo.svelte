<script>
  import Icon from "components/Icon";
  import {setRef} from 'store/recipe'

  const label = "Undo";
</script>

<button
  type="button"
  aria-label={label}
  id="recipe__header__toolbar__undo"
  class="recipe__header__toolbar__undo-redo"
  use:setRef={"undo"}
>
  <Icon {...{
    icon: "undo--20",
    size: 20,
    label,
    role: "presentation",
  }} />
</button>

<style lang="scss">
</style>
