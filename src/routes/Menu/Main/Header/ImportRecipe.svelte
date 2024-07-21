<script>
  import { get, writable } from "svelte/store";

  import ImportModal from "./ImportModal.svelte";
  import Icon from "components/Icon/Icon.svelte";

  const iconProps = {
    icon: "import--20",
    size: 20,
    label: "Import recipe",
    // fill: "#f5853f",
  };

  const modalProps = {
    id: "header__import-recipe__modal",
    show: writable(false),
    toggleShow: toggleModal,
  };

  function toggleModal(show = null) {
    modalProps.show.set(show ?? !get(modalProps.show));
  }
</script>

<button
  id="header__import-recipe"
  class="menu__header__button menu__header__button--secondary"
  on:click={() => {
    return toggleModal();
  }}
  aria-controls={modalProps.id}><Icon {...iconProps} /> Import Recipe</button
>
<ImportModal {...modalProps} />

<style lang="scss">
</style>
