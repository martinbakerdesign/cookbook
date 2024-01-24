<script>
  import Icon from "components/Icon/Icon.svelte";

  const label = "Redo";
  const iconProps = {
    icon: "redo--20",
    size: 20,
    label,
    role: "presentation",
  };
</script>

<button
  type="button"
  aria-label={label}
  id="recipe__header__toolbar__redo"
  class="recipe__header__toolbar__undo-redo"
>
  <Icon {...iconProps} />
</button>

<style lang="scss">
</style>
