<script>
  import RecipeEditor from "./RecipeMainEditor.svelte";
  
  import "./MainSection.scss";
  import "./Ingredients/Ingredients.scss";
  import "./Method/Method.scss";

  // TODO Add notes section/functionality
</script>

<main>
  <RecipeEditor />
</main>

<style lang="scss">

  main {
    display: block;
    height: 100vh;
    overflow: hidden;
  }
</style>
