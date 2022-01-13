<script>
  import Recipes from "components/Menu/Recipes/MenuRecipes.svelte";
  import getAllRecipes from "utils/db/recipes/getAll";
  import user from "store/user";
  import { bg } from "store/";
  import "components/Menu/Recipes/Modals/menu__recipe__modal.scss";

  $: $user && getAllRecipes($user.id);
</script>

<svelte:head>
  <title>Cookbook</title>
</svelte:head>
<article
  id="menu"
  style={`background-image: url(/assets/img/landing/${$bg[0]}.webp)`}
>
  <Recipes />
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/layers" as l;

  #menu {
    position: relative;
    background-image: url(/assets/img/fence/pepper-pattern--spencer-gabor.png);
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
</style>
