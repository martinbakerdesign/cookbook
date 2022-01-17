<script>
  import Animation from "components/Animation/Animation.svelte";
  import { loadingRecipes } from "store/";
  import { onDestroy, setContext } from "svelte";
  import { writable } from "svelte/store";

  import Header from "./Header/MenuRecipesHeader.svelte";
  import List from "./List/MenuRecipesList.svelte";
  import DeleteModal from "./Modals/DeleteModal.svelte";
  import RenameModal from "./Modals/RenameModal.svelte";
  import ShareModal from "./Modals/ShareModal.svelte";

  const showShareModal = writable(false);
  const showRenameModal = writable(false);
  const showDeleteModal = writable(false);
  const modalId = writable(null);
  const selecting = writable(false);

  const animationProps = {
    animation: "loading--wok--64",
    fps: 30,
    fill: "#f5853f",
  };

  setContext("menu__modals", {
    renameModal: showRenameModal,
    shareModal: showShareModal,
    deleteModal: showDeleteModal,
    id: modalId,
    selecting,
    hide: hideModals,
  });

  $: window[
    $showRenameModal || $showShareModal || $showDeleteModal
      ? "addEventListener"
      : "removeEventListener"
  ]("pointerup", onClickOut),
    window[
      $showRenameModal || $showShareModal || $showDeleteModal
        ? "addEventListener"
        : "removeEventListener"
    ]("keyup", onEscape);

  onDestroy(() => {
    window.removeEventListener("pointerup", onClickOut);
    window.removeEventListener("keyup", onEscape);
  });

  function hideModals() {
    showRenameModal.set(false),
      showShareModal.set(false),
      showDeleteModal.set(false),
      modalId.set(null);
  }
  function onClickOut(e) {
    if (
      e.target.closest(".modal") ||
      e.target.closest(".contextmenu__list__item") ||
      e.target.closest(".menu__recipes__list__item__delete") ||
      $selecting
    )
      return;
    hideModals();
  }
  function onEscape(e) {
    if (e.key === "Escape" || e.keyCode === 27) hideModals();
  }
</script>

<main id="menu__recipes">
  <div class="slide">
    <Header />
    <div class="container" class:loading={$loadingRecipes}>
      {#if !$loadingRecipes}
        <List />
      {:else}
        <div class="loading">
          <Animation {...animationProps} />
        </div>
      {/if}
    </div>
  </div>
</main>

<ShareModal />
<RenameModal />
<DeleteModal />

<style lang="scss">
  @import "../../../styles/colours.scss";
  @import "../../../styles/sizes.scss";

  #menu__recipes {
    display: flex;
    flex-direction: column;
    width: 100%;

    .slide {
      margin-top: $s9;
      background-color: white;
      height: 100%;
      position: relative;
    }
    .container {
      width: var(--main);
      margin: 0 auto;
    }
    .loading {
      padding: $s6;
      text-align: center;
      font-size: 1rem;
      color: $grey-63;
    }
  }
</style>
