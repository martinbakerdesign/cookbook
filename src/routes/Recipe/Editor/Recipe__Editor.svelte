<script>
  import { loading } from "store";
  import { onDestroy, onMount } from "svelte";
  import { cleanup, mountEditor } from "routes/Recipe";
  import { setRef } from "store/recipe";

  import "./MainSection.scss";
  import "./Ingredients.scss";
  import "./Method.scss";
  import "./Editor.scss";

  const sections = [
    {
      key: "notes",
      heading: "Notes",
    },
    {
      key: "ingredients",
      heading: "Ingredients",
    },
    {
      key: "miseenplace",
      heading: "Mise En Place",
    },
    {
      key: "method",
      heading: "Method",
    },
  ];

  // onMount();
  onDestroy(cleanup);
</script>

<div
  id="recipe__editor"
  class:loading={$loading}
  use:mountEditor
>
  <!-- {#each sections as {key, heading}}
    <h2 data-section={key}>{heading}</h2>
  {/each} -->
</div>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @import "../../../styles/typo.scss";

  #recipe__editor {
    white-space: pre-wrap;
    display: block;
    height: 100vh;
    overflow: hidden;
  }
</style>
