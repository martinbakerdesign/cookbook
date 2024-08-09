<script>
  import { onDestroy, onMount } from "svelte";
  import { url, recipes } from "store";
  import { recipeId } from "../";
  import {
    getShareLink,
    getSwitchProps,
    refs,
    success,
    copyToClipboard,
    cancel,
    saving,
    selectAll,
    cleanup,
    init,
    id,
  } from ".";

  import { Switch } from "components/Inputs";
  import Modal, { Actions, Content, Title } from "components/Modal";
  import Button from "components/Button/Button.svelte";

  $: shareLink = getShareLink($url, $recipeId);
  $: switchProps = getSwitchProps($recipes, $recipeId);
  $: saveButtonLabel = ["Done", "Updating..."][+$saving];

  onMount(init);
  onDestroy(cleanup);
</script>

<Modal {id}>
  <Content>
      <Title slot="header">Share Recipe</Title>

      
      <div class="flex gap-2">
        <input
          class="bg-background-fill-subtle hover:bg-background-fill-subtle-hover active:bg-background-fill-subtle-active placeholder:text-text-secondary text-text text-body-lg py-3 px-4 rounded-1 w-full outline-none h-20"
          type="text"
          value={shareLink}
          readonly
          on:click={selectAll}
          bind:this={refs.input}
        />
        <Button
          variant={!$success ? 'secondary' : 'success'}
          size="lg"
          class="flex-none"
          on:click={copyToClipboard}
        >
          <span bind:this={refs.copyButtonLabel}>Copy Link</span>
        </Button>
      </div>
      <div class="">
        <Switch {...switchProps} />
      </div>

      <Actions slot="footer">
        <Button
          variant="accent"
          size="lg"
          class="flex-1 w-full"
          on:click={cancel}
          disabled={$saving}>{saveButtonLabel}</Button
        >
      </Actions>
  </Content>
</Modal>

<style lang="scss">
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/colours" as c;

  .menu__recipes__item__share {
    min-width: 28rem;

    .menu__recipes__item__modal {
      &__heading {
        margin-bottom: s.$s6;
      }
    }
  }

  .menu__recipes__item__modal {
    &__copylink,
    &__switch {
      padding: 0 s.$s4;
    }
    &__copylink {
      width: 100%;
      display: flex;
      gap: s.$s2;
      margin-bottom: s.$s4;
      &__input,
      &__button {
        font-family: inherit;
        padding: s.$s3 s.$s2;
        border-radius: s.$s2;
        border: 0;
        outline: 0;
      }
      &__input {
        background-color: c.$grey-96;
        color: c.$accent;
        flex: 1;
      }
      &__button {
        flex: none;
        background-color: transparent;
        color: c.$contrast;
        font-weight: 600;
        letter-spacing: calc(0.2 / 16 * 1em);
        cursor: pointer;

        @mixin focus {
          background-color: c.$grey-96;
        }
        &:focus-visible {
          @include focus;
        }
        @media (hover: hover) {
          &:hover {
            @include focus;
          }
        }

        &.success {
          background-color: c.$success;
          pointer-events: none;
          user-select: none;
          span {
            color: c.$grey-63;
            mix-blend-mode: multiply;
          }
        }
      }
    }
    &__switch {
      margin-bottom: s.$s5;
      width: 100%;
    }
  }

  :global(.menu__recipes__item__modal__switch .input--switch) {
    width: 100%;
    justify-content: space-between;

    label {
      font-size: 0.875rem;
    }
  }
</style>
