<script>
  import { getContext } from "svelte";

  import ContextMenuDivider from "./ContextMenuDivider.svelte";
  import ContextMenuItem from "./ContextMenuItem.svelte";

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

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/sizes" as s;
  @use "../../styles/layers" as l;

  .contextmenu {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 0.25rem;
    background-color: var(--bg-primary);
    padding: 0.375rem;
    min-width: max-content;
    will-change: transform;
    font-size: 0.75rem;
    letter-spacing: calc(0.1 / 14 * 1em);
    box-shadow: 0px 0px 0.25rem 0px rgba(0, 0, 0, 0.25);
    z-index: l.$header;
    width: 11.25rem;

    &__list {
      list-style: none;
    }
  }
</style>
