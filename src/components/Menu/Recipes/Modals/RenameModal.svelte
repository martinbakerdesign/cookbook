<script>
  import Modal from "components/Modal/Modal.svelte";
  import { recipes } from "store/";
  import { getContext, onDestroy } from "svelte";
  import { writable } from "svelte/store";

  let inputRef;
  const value = writable("");
  const saving = writable(false);
  const error = writable();

  const { renameModal, hide, id, selecting } = getContext("menu__modals");

  $: value.set($id != null ? recipes.findById($id)?.name ?? "" : "");
  $: window[$selecting ? "addEventListener" : "removeEventListener"](
    "pointerup",
    onPointerUp
  );

  onDestroy(() => {
    window.removeEventListener("pointerup", onPointerUp);
  });

  async function renameRecipe() {
    error.set(null);
    if (!$value.length) return error.set("Recipe name cannot be empty");

    try {
      saving.set(true);

      await recipes.rename($id, $value);

      hide();
      value.set("");
    } catch (err) {
      throw err;
    } finally {
      saving.set(false);
    }
  }
  function cancel() {
    hide();
    inputRef.value = "";
    saving.set(false);
  }
  function onPointerDown() {
    selecting.set(true);
  }
  function onPointerUp() {
    selecting.set(false);
  }
</script>

<Modal show={$renameModal} autofocus={true}>
  <div class="menu__recipes__item__rename menu__recipes__item__modal">
    <h2 class="menu__recipes__item__modal__heading">Rename recipe</h2>
    <input
      type="text"
      bind:this={inputRef}
      class="menu__recipes__item__modal__input"
      placeholder="My Recipe"
      bind:value={$value}
      on:pointerdown={onPointerDown}
    />
    <div class="menu__recipes__item__modal__actions">
      <button type="button" on:click={cancel} disabled={$saving}>Cancel</button>
      <button type="button" on:click={renameRecipe} disabled={$saving}>
        {#if !$saving}
          OK
        {:else}
          Saving ...
        {/if}
      </button>
    </div>
  </div>
</Modal>

<style lang="scss">
</style>
