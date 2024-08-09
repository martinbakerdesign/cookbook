<script>
  import Modal, { Content, Title, Actions } from "components/Modal";
  import { onMount } from "svelte";
  import {
    value,
    onPointerDown,
    cancel,
    saving,
    renameRecipe,
    refs,
    init,
    id,
  } from ".";
  import Button from "components/Button";

  $: saveButtonLabel = ["OK", "Saving ..."][+$saving];

  onMount(init);
</script>

<Modal
  autofocus={true}
  {id}
>
  <Content>
    <Title slot="header">Rename Recipe</Title>
    <input
      type="text"
      bind:this={refs.input}
      class="bg-background-fill-subtle hover:bg-background-fill-subtle-hover active:bg-background-fill-subtle-active placeholder:text-text-secondary text-text text-body-lg py-3 px-4 rounded-1 w-full outline-none h-20"
      placeholder="My Recipe"
      bind:value={$value}
      on:pointerdown={onPointerDown}
    />

    <Actions slot="footer">
      <Button
        type="button"
        on:click={cancel}
        disabled={$saving}
        variant="secondary"
        size="lg"
        class="flex-1">Cancel</Button
      >
      <Button
        type="button"
        on:click={renameRecipe}
        disabled={$saving}
        variant="accent"
        size="lg"
        class="flex-1">{saveButtonLabel}</Button
      >
    </Actions>
  </Content>
</Modal>

<style lang="scss">
</style>
