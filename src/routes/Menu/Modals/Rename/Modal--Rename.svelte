<script>
  import Modal from "components/Modal/Modal.svelte";
  import { onDestroy, onMount } from "svelte";
  import {showRenameModal} from '..'
  import {cleanup, value, onPointerDown, cancel, saving, renameRecipe, refs, init} from '.'

  $: saveButtonLabel = ['OK', 'Saving ...'][+$saving];

  onMount(init)
  onDestroy(cleanup);
</script>

<Modal show={$showRenameModal} autofocus={true}>
  <div class="menu__recipes__item__rename menu__recipes__item__modal">
    <h2 class="menu__recipes__item__modal__heading">Rename recipe</h2>
    <input
      type="text"
      bind:this={refs.input}
      class="menu__recipes__item__modal__input"
      placeholder="My Recipe"
      bind:value={$value}
      on:pointerdown={onPointerDown}
    />
    <div class="menu__recipes__item__modal__actions">
      <button type="button" on:click={cancel} disabled={$saving}>Cancel</button>
      <button type="button" on:click={renameRecipe} disabled={$saving}>
        {saveButtonLabel}
      </button>
    </div>
  </div>
</Modal>

<style lang="scss">
</style>
