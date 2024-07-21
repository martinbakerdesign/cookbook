<script>
  import { onDestroy, onMount } from "svelte";
  import { url, recipes } from "store";
  import { recipeId, showShareModal } from "../";
  import {
    updateShareLink,
    getSwitchProps,
    refs,
    success,
    copyToClipboard,
    cancel,
    saving,
    selectAll,
    shareLink,
    cleanup,
    init
  } from ".";

  import {Switch} from "components/Inputs";
  import Modal from "components/Modal";

  $: updateShareLink($url, $recipeId);
  $: switchProps = getSwitchProps($recipes, $recipeId);
  $: saveButtonLabel = ["Done", "Updating..."][+$saving];

  onMount(init);
  onDestroy(cleanup);
</script>

<Modal show={$showShareModal}>
  <div class="menu__recipes__item__share">
    <h2 class="menu__recipes__item__modal__heading">Share recipe</h2>
    <div class="menu__recipes__item__modal__copylink">
      <input
        class="menu__recipes__item__modal__copylink__input"
        type="text"
        value={$shareLink}
        readonly
        on:click={selectAll}
      />
      <button
        class="menu__recipes__item__modal__copylink__button"
        type="button"
        on:click={copyToClipboard}
        bind:this={refs.copyButton}
        class:success={$success}
      >
        <span bind:this={refs.copyButtonLabel}>Copy link</span>
      </button>
    </div>
    <div class="menu__recipes__item__modal__switch">
      <Switch {...switchProps} />
    </div>
    <div class="menu__recipes__item__modal__actions">
      <button
        type="button"
        on:click={cancel}
        disabled={$saving}
      >
        {saveButtonLabel}
      </button>
    </div>
  </div>
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
