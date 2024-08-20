<script>
  import Modal, { Content, Title, Actions } from "components/Modal";
  import Button from "components/Button";
  import { cancel, deleteRecipe, deleting, id } from ".";

  $: deleteButtonLabel = ["Yes", "Deleting ..."][+$deleting];
</script>

<Modal {id}>
  <Content>
    <Title slot="header">Are you sure?</Title>
    <Actions>
      <Button
        variant="secondary"
        type="button"
        on:click={cancel}
        disabled={$deleting}
        size="lg"
        class="w-full flex-1"
        >No</Button
      >
      <Button
        type="button"
        on:click={deleteRecipe}
        disabled={$deleting}
        variant="critical"
        size="lg"
        class="w-full flex-1"
      >
        {deleteButtonLabel}
      </Button>
    </Actions>
  </Content>
</Modal>
