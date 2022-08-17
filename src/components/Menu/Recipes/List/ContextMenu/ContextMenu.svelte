<script>
  import { recipes } from "store/";

  import { getContext } from "svelte";
  import duplicateRecipe from "utils/db/recipes/duplicateRecipe";

  import ContextMenuDivider from "./ContextMenuDivider.svelte";
  import ContextMenuItem from "./ContextMenuItem.svelte";

  import "./ContextMenu.scss";

  export let pos = [0, 0];
  export let show = false;
  export let hideContext = () => {};
  export let recipeId;

  const { shareModal, deleteModal, renameModal, id } =
    getContext("menu__modals");

  const types = {
    ITEM: "ITEM",
    DIVIDER: "DIVIDER",
  };

  const items = [
    {
      label: "Share",
      icon: "share",
      onClick: () => {
        shareModal.set(true);
        id.set(recipeId);
        hideContext();
      },
      type: types.ITEM,
    },
    {
      label: "Rename",
      icon: "rename",
      onClick: () => {
        renameModal.set(true);
        id.set(recipeId);
        hideContext();
      },
      type: types.ITEM,
    },
    {
      label: "Duplicate",
      icon: "copy",
      onClick: async () => {
        try {
          await duplicateRecipe(recipeId), await recipes.refresh();
          return;
        } catch (err) {
        } finally {
          hideContext();
        }
      },
      type: types.ITEM,
    },
    {
      type: types.DIVIDER,
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: () => {
        deleteModal.set(true);
        id.set(recipeId);
        hideContext();
      },
      type: types.ITEM,
    },
  ];
</script>

{#if show}
  <div
    class="contextmenu"
    style={`transform: translate3d(${pos[0]}px, ${pos[1]}px, 0);`}
  >
    <ul
      class="contextmenu__list"
      role="menu"
      aria-orientation="vertical"
      dir="ltr"
      tabindex="-1"
    >
      {#each items as item, index}
        {#if item.type === types.ITEM}
          <ContextMenuItem {index} {...item} />
        {:else if item.type === types.DIVIDER}
          <ContextMenuDivider {index} {...item} />
        {/if}
      {/each}
    </ul>
  </div>
{/if}
