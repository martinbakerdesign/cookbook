<script>
  // import Ingredients from "./Ingredients/Ingredients.svelte";
  // import IngredientsEditor from "./Ingredients/Editor.svelte";
  // import Method from "./Method/Method.svelte";
  // import MethodEditor from "./Method/Editor.svelte";

  import RecipeMainSection from "./RecipeMainSection.svelte";
  import "./MainSection.scss";
  import "./Ingredients/Ingredients.scss";
  import "./Method/Method.scss";

  const sections = [
    {
      id: "ingredients",
      header: "Ingredients",
      editor: {
        type: "RECIPE__EDITOR--INGREDIENTS",
        placeholder: "Ingredient",
        className: "ingredients",
        context: "ingredients",
      },
    },
    {
      id: "method",
      header: "Method",
      editor: {
        type: "RECIPE__EDITOR--METHOD",
        placeholder: "Step",
        className: "method",
        context: "method",
      },
    },
  ];

  // TODO Add notes section/functionality
</script>

<main>
  {#each sections as section, index}
    <RecipeMainSection {...{ index, ...section }} />
  {/each}
  <!-- <Ingredients />
  <Method /> -->
</main>

<style lang="scss">

  main {
    display: grid;
    grid-template-columns: 28.25rem 1fr;
    align-items: start;
    height: 100%;
    flex: 1;
    overflow: hidden;
    margin-bottom: 3.25rem;
  }
</style>
