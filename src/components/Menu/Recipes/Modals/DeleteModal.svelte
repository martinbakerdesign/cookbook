<script>
  import Modal from "components/Modal/Modal.svelte";
  import { recipes } from "store";
  import { getContext } from "svelte";
  import { writable } from "svelte/store";

  const deleting = writable(false);
  const error = writable();

  const { deleteModal, hide, id } = getContext("menu__modals");

  async function deleteRecipe() {
    error.set(null);
    try {
      deleting.set(true);

      await recipes.delete($id);

      deleteModal.set(false);
    } catch (err) {
      error.set(err);
      throw err;
    } finally {
      deleting.set(false);
    }
  }
  function cancel() {
    hide();
    deleting.set(false);
  }
</script>

<Modal show={deleteModal}>
  <div class="menu__recipes__item__delete menu__recipes__item__modal">
    <h2 class="menu__recipes__item__modal__heading">Are you sure?</h2>
    <div class="menu__recipes__item__modal__actions">
      <button type="button" on:click={cancel} disabled={$deleting}>No</button>
      <button type="button" on:click={deleteRecipe} disabled={$deleting}>
        {#if !$deleting}
          Yes
        {:else}
          Deleting ...
        {/if}
      </button>
    </div>
  </div>
</Modal>
