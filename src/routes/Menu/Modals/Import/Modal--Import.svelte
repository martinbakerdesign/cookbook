<script>
  import Modal, { Title, Actions, Content } from "components/Modal";
  import Animation from "components/Animation";
  import Button from "components/Button";
  import {
    id,
    saving,
    inputDisabled,
    saveButtonLabel,
    handleChange,
    cancel,
    importRecipe,
    recipe,
    saveDisabled,
    init,
    refs,
    loading,
  } from ".";
  import { onMount } from "svelte";
  import animProps from "constants/anim";
  import Tag from "components/Tag";

  $: hideSaveButton = null == $recipe;

  onMount(init);
</script>

<Modal {...{ id, autofocus: true }}>
  <Content>
    <Title>Import Recipe</Title>
    <input
      bind:this={refs.input}
      class="bg-background-fill-inverted hover:bg-background-fill-inverted-hover active:bg-background-fill-inverted-active placeholder:text-text-secondary text-text text-body-lg py-3 px-4 rounded-1 outline-none h-20 w-full"
      placeholder="Paste of type a recipe URL here..."
      type="url"
      on:input={handleChange}
      disabled={$inputDisabled}
    />
    {#if $loading}
      <div
        class="select-none pointer-events-none flex items-center justify-center fill-accent text-heading-md text-text-secondary"
      >
        Fetching recipe...
      </div>
    {:else if $recipe}
      <div
        class="bg-background-fill-subtle rounded-1 overflow-hidden overflow-y-auto max-h-[72vh] lg:max-h-[64vh] p-10 flex flex-col gap-y-10 text-body-md"
      >
        <div class="text-heading-lg">{$recipe.name}</div>

        <ul class="menu__import__recipe__meta">
          {#if $recipe?.amount}<li>{$recipe.amount}</li>{/if}
          {#if $recipe?.duration?.text && $recipe?.duration?.text.length > 0}<li>{$recipe.duration.text}</li>{/if}
          {#if $recipe?.tags && $recipe.tags.length > 0}<li class="flex flex-wrap gap-2 items-center">
            {#each $recipe.tags as tag}
            <Tag>{tag}</Tag>
            {/each}
          </li>{/if}
        </ul>

        <ul class="menu__import__recipe__ingredients">
          {#each $recipe.ingredients as ingredient}
            <li data-type={ingredient.type}>{ingredient.text}</li>
          {/each}
        </ul>

        <ol class="menu__import__recipe__method">
          {#each $recipe.method as method}
            <li data-type={method.type}>{method.text}</li>
          {/each}
        </ol>

        {#if $recipe?.notes && $recipe?.notes.length > 0}
        <div class="menu__import__recipe__notes space-y-4">
          {#each $recipe.notes as note}
            <p>{note?.text ?? note}</p>
          {/each}
        </div>
        {/if}

      </div>
    {/if}
    <Actions>
      <Button
        type="button"
        on:click={cancel}
        variant="secondary"
        size="lg"
        disabled={$saving}
        class="flex-1 w-full">Cancel</Button
      >
      <Button
        type="button"
        disabled={$saveDisabled}
        variant="primary"
        size="lg"
        on:click={importRecipe}
        class="flex-1 w-full"
        hidden={hideSaveButton}
        aria-hidden={hideSaveButton}>{$saveButtonLabel}</Button
      >
    </Actions>
  </Content>
</Modal>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .menu__import {

    &__recipe {

      &__ingredients,
      &__method,
      &__notes {
        &:before {
          @apply uppercase block mb-6 font-semibold text-body-xs tracking-loosest;
        }
        li {
          margin-bottom: s.$s1;
          &:last-child {
            margin-bottom: 0;
          }
          &[data-type="HEADER"] {
            @apply text-heading-sm my-4;

            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
      &__ingredients {
        list-style: none;
        display: block;

        &:before {
          content: "Ingredients";
        }
      }
      &__method {
        counter-reset: method;
        list-style: none;

        li {
          padding-left: s.$s5;
          position: relative;

          &:before {
            display: inline-block;
            content: counter(method);
            counter-increment: method;
            position: absolute;
            left: 0;
            top: 0;
          }

          &[data-type="HEADER"] {
            padding-left: 0;
            margin-left: 0;

            &:before {
              content: none;
              counter-reset: method;
            }
          }
        }
        &:before {
          content: "Method";
        }
      }
      &__notes {
        &:before {
          content: "Notes";
        }
      }
    }
  }
  input {
    &:disabled {
      pointer-events: none;
      user-select: none;
    }
  }
</style>
