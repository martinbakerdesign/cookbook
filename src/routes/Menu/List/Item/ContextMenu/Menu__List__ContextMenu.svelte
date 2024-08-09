<script>
  import ContextMenu from "components/ContextMenu";
  import {items} from '.'

  export let show = false;
  export let hideContext = () => {};
  export let recipeId;
  export let pos = [0,0]
</script>

<ContextMenu
  {...{
    items,
    show,
    hideContext,
    recipeId,
    pos
  }}
/>