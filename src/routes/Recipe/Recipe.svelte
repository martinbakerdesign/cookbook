<script>
  import {
    loading,
    mutationSource,
  } from "store/index";
  import fetchRecipe from "utils/db/recipes/fetchRecipe";
  import { getPageTitle, onExternalMutation, Overview, Editor, EditorBar } from ".";
  import { canEdit } from 'store/recipe'
  import {title} from 'store/index'

  export let params = { id: null };
  $: params.id && fetchRecipe(params.id);

  $: onExternalMutation($mutationSource);

  $: pageTitle = getPageTitle(params, $title);
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<article id="recipe">
  <Overview />
  <Editor />
  {#if $canEdit}<EditorBar />{/if}
</article>