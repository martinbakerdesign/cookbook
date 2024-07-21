<script>
  import ContextMenu from "components/ContextMenu";
  import {items} from '.'

  export let show = false;
  export let hideContext = () => {};
  export let recipeId;
</script>

<ContextMenu
  {...{
    items,
    show,
    hideContext,
    recipeId
  }}
/>