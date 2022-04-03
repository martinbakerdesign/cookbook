<script>
  import Recipes from "components/Menu/Recipes/MenuRecipes.svelte";
  import getAllRecipes from "utils/db/recipes/getAll";
  import user from "store/user";
  import "components/Menu/Recipes/Modals/menu__recipe__modal.scss";

  $: $user && getAllRecipes($user.id);
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>
<article id="menu">
  <Recipes />
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/layers" as l;

  #menu {
    position: relative;
  }
</style>
