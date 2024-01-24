<script>
  import { editorFocus, blockType, loading } from "store";

  import { getContext, onMount } from "svelte";
  import "./Editor.scss";

  const { getView, onMount: onDomMount } = getContext("recipe");

  let editorRef;

  let view;
  onMount(() => {
    view = getView();

    view.dom.addEventListener("click", onEditorClick);

    return () => {
      view.dom.removeEventListener("click", onEditorClick), view?.destroy();
    };
  });

  function onEditorClick({ target }) {
    let focus = target.closest("#recipe__editor--ingredients")
      ? "ingredients"
      : target.closest("#recipe__editor--method")
      ? "method"
      : null;
    let block =
      focus === "ingredients"
        ? "ingredient"
        : focus === "method"
        ? "step"
        : null;
    editorFocus.set(focus),
      blockType.set(block),
      view.dom.removeEventListener("click", onEditorClick);
  }
</script>

<div
  use:onDomMount
  id="recipe__editor"
  class:loading={$loading}
  bind:this={editorRef}
>
  <h2 id="recipe__editor__header" data-section="ingredients">Ingredients</h2>
  <h2 id="recipe__editor__header" data-section="method">Method</h2>
</div>

<style lang="scss">
  @use "../../../styles/sizes" as s;
  @use "../../../styles/colours" as c;
  @import "../../../styles/typo.scss";

  #recipe__editor {
    white-space: pre-wrap;
  }
</style>
