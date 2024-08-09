<script>
  import { onMount } from "svelte";
  import {initToolbar} from 'routes/Recipe'
  import {
    Undo,
    Redo,
    Divider,
    BlockType,
    UnitSelect,
    Scale
  } from '.'

  import "./Select.scss";
  import "./UndoRedo.scss";

  onMount(initToolbar);
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
