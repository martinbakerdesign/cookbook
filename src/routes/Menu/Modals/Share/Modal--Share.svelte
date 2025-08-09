<script>
  import { onDestroy, onMount } from "svelte";
  import { url, recipes } from "store";
  import { recipeId } from "../";
  import Icon from "components/Icon";
  import {
    getShareLink,
    getSwitchProps,
    refs,
    success,
    copyToClipboard,
    cancel,
    saving,
    selectAll,
    init,
    id,
    defaultSwitchProps,
  } from ".";

  import { Switch } from "components/Inputs";
  import Modal, { Actions, Content, Title } from "components/Modal";
  import Button from "components/Button/Button.svelte";
  import { writable } from "svelte/store";
  import getRecipeByID from "utils/recipes/getRecipeByID";
  
  $: recipe = getRecipeByID($recipes, $recipeId);
  $: disabled = null === recipe;
  
  const switchProps = writable(defaultSwitchProps);
  $: switchProps.set(getSwitchProps(recipe));
  $: shareLink = getShareLink($url, $recipeId);
  $: saveButtonLabel = ["Done", "Updating..."][+$saving];
  $: copyIcon = `${$success ? 'tick' : 'link'}--20`;

  onMount(init);
</script>

<Modal {id}>
  <Content>
      <Title slot="header">Share Recipe</Title>

      
      <div class="flex flex-col gap-y-1">
        <div class="relative">
          <input
            class="bg-background-fill-inverted hover:bg-background-fill-inverted-hover active:bg-background-fill-inverted-active placeholder:text-text-secondary text-text py-3 px-4 rounded-1 w-full outline-none h-20 pr-26 text-body-sm"
            type="text"
            value={shareLink}
            readonly
            on:click={selectAll}
            bind:this={refs.input}
          />
          <Button
            variant={!$success ? 'accent' : 'success'}
            size="lg"
            class="flex-none absolute right-1 top-1/2 -translate-y-1/2"
            on:click={copyToClipboard}
            isIcon={true}
            aria-label="Copy Link"
          >
            <Icon icon={copyIcon} size={20}/>
          </Button>
        </div>
        <div class="flex items-center gap-x-3 h-20 p-3 rounded-1 bg-background-fill-subtle fill-icon flex-1 w-full">
          <Switch {...$switchProps}/>
        </div>
      </div>

      <Actions slot="footer">
        <Button
          variant="primary"
          size="lg"
          class="w-full flex-1"
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
