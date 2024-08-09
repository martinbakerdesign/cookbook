<script>
  import { loading } from "store";
  import { onMount } from "svelte";
  import { init, mountEditor } from "routes/Recipe";
  import {canEdit} from 'store/recipe'
  import './Recipe__Editor.css'

  onMount(init)
</script>

<div
  id="recipe__editor"
  class="block whitespace-pre-wrap text-body-lg"
  class:loading={$loading}
  class:can-edit={$canEdit}
  use:mountEditor
/>