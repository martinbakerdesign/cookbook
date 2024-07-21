<script>
  import Modal from "components/Modal/Modal.svelte";
  import { showDeleteModal } from '..'
  import {cancel, deleteRecipe, deleting} from '.'

  $: deleteButtonLabel = ['Yes', 'Deleting ...'][+$deleting];
</script>

<Modal show={$showDeleteModal}>
  <div class="menu__recipes__item__delete menu__recipes__item__modal">
    <h2 class="menu__recipes__item__modal__heading">Are you sure?</h2>
    <div class="menu__recipes__item__modal__actions">
      <button type="button" on:click={cancel} disabled={$deleting}>No</button>
      <button type="button" on:click={deleteRecipe} disabled={$deleting}>
        {deleteButtonLabel}
      </button>
    </div>
  </div>
</Modal>
