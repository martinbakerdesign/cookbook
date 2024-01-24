<script>
  import { getContext, onMount } from "svelte";

  import Undo from "./Undo.svelte";
  import Redo from "./Redo.svelte";
  import Divider from "./Divider.svelte";
  import BlockType from "./BlockType.svelte";
  import UnitSelect from "./UnitSelect.svelte";
  import Scale from "./Scale.svelte";

  import "./Select.scss";
  import "./UndoRedo.scss";

  const { getView } = getContext("recipe");
  const view = getView();
  onMount(() => {
    view.pluginViews[0].init();
  });
</script>

<div id="recipe__header__toolbar">
  <main>
    <div id="recipe__header__toolbar__undo-redo">
      <Undo />
      <Redo />
    </div>
    <Divider />
    <div id="recipe__header__toolbar__block-type">
      <BlockType />
    </div>
    <Divider />
    <div id="recipe__header__toolbar__unit-select">
      <UnitSelect />
    </div>
  </main>
  <Scale />
</div>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;

  #recipe__header__toolbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: s.$s4;
    border-top: 1px solid var(--border);
    padding-top: s.$s3;

    main {
      display: flex;
      align-items: center;
    }

    &__undo-redo {
      display: flex;
      gap: s.$s3;
    }
  }
</style>
