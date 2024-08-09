<script>
  import Modal, { Title, Actions, Content } from "components/Modal";
  import Button from "components/Button";
  import { id, saving, inputDisabled, saveButtonLabel, handleChange, cancel, importRecipe, recipe, saveDisabled, init, refs } from ".";
  import { onMount } from "svelte";

  onMount(init)
</script>

<Modal {...{ id, autofocus: true }}>
  <Content>
    <Title>Import Recipe</Title>
    <input
      bind:this={refs.input}
      class="bg-background-fill-subtle hover:bg-background-fill-subtle-hover active:bg-background-fill-subtle-active placeholder:text-text-secondary text-text text-body-lg py-3 px-4 rounded-1 outline-none h-20 w-full"
      placeholder="Recipe URL"
      type="url"
      on:change={handleChange}
      disabled={$inputDisabled}
    />
    {#if $recipe}
      <div class="bg-background-fill-subtle rounded-1 overflow-hidden overflow-y-auto max-h-[72vh] lg:max-h-[64vh] p-4">
        <div class="menu__import__recipe__name">{$recipe.name}</div>
        <ul class="menu__import__recipe__meta">
          <li>{$recipe.amount}</li>
          <li>{$recipe.duration.text}</li>
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
      </div>
    {/if}
    <Actions>
      <Button
        type="button"
        on:click={cancel}
        variant="secondary"
        size="lg"
        disabled={$saving}>Cancel</Button
      >
      <Button
        type="button"
        disabled={$saveDisabled}
        variant="primary"
        size="lg"
        on:click={importRecipe}
        >{$saveButtonLabel}</Button
      >
    </Actions>
  </Content>
</Modal>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  .menu__import {
    max-width: calc(100% - 6rem);
    width: 32rem;

    &__heading,
    &__input__container,
    &__recipe {
      margin-left: s.$s4;
      margin-right: s.$s4;
    }
    &__heading {
      font-size: 1rem;
      font-weight: 600;
      display: block;
      margin: s.$s4;
      margin-bottom: s.$s5;
    }
    &__input__container {
      display: flex;
      margin-bottom: s.$s3;

      input,
      button {
        padding: s.$s1 s.$s3;
        border-radius: 0.375rem;
        font-family: inherit;
        font-size: 0.875rem;
        padding: 0.375rem s.$s3;
        line-height: 1.25rem;
        letter-spacing: calc(-0.1 / 14 * 1em);
        outline: 0;

        &:focus-visible {
          box-shadow: 0 0 0 2px inset var(--accent);
        }
        &:disabled {
          pointer-events: none;
          user-select: none;
          opacity: 0.4;
        }
      }

      input {
        border: 0;
        color: var(--text-primary);
        background-color: var(--bg-secondary);
        flex: 1;
        margin-right: s.$s3;
      }
      button {
        background-color: transparent;
        border: 1px solid var(--accent);
        color: var(--accent);
        flex: none;
        cursor: pointer;
        font-weight: 500;

        &:hover {
          background-color: var(--accent);
          color: var(--black);
        }
      }
    }
    &__recipe {
      margin-top: s.$s4;
      margin-bottom: s.$s4;
      background-color: var(--bg-secondary);
      padding: s.$s4;
      border-radius: 0.5rem;
      max-height: 35vh;
      overflow: hidden;
      overflow-y: scroll;
      font-size: 0.875rem;

      &__name {
        @include t.font-soehne;
        margin-bottom: s.$s3;
        font-size: 1rem;
        font-weight: 500;
      }
      &__meta {
        list-style: none;
        display: flex;
        gap: s.$s5;
        align-items: flex-start;
        margin-bottom: s.$s5;
      }

      &__ingredients,
      &__method {
        &:before {
          font-size: 0.625rem;
          letter-spacing: calc(0.8 / 10 * 1em);
          margin-bottom: s.$s2;
          display: block;
        }
        li {
          margin-bottom: s.$s1;
          &:last-child {
            margin-bottom: 0;
          }
          &[data-type="HEADER"] {
            list-style: none;
            font-size: 0.75rem;
            font-weight: 600;
            margin-top: s.$s2;
            margin-bottom: s.$s3;
            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
      &__ingredients {
        list-style: none;
        display: block;
        margin-bottom: s.$s5;

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
    }
    &__actions {
      display: flex;
      padding: s.$s4;
      gap: s.$s3;

      button {
        flex: 1;
        font-family: inherit;
        font-size: 0.75rem;
        font-weight: 400;
        background-color: transparent;
        padding: s.$s3 s.$s2;
        border: 0;
        letter-spacing: calc(0.1 / 12 * 1em);
        position: relative;
        cursor: pointer;
        border-radius: 0.375rem;

        &:first-child {
          --color: var(--text-primary);
          border: 1px solid var(--color);
          color: var(--color);

          @mixin focus {
            border-color: var(--accent);
            color: var(--accent);
          }

          &:focus-visible {
            @include focus;
          }
          @media (hover: hover) {
            &:hover {
              @include focus;
            }
          }
        }
        &:last-child {
          background-color: var(--text-primary);
          color: var(--bg-primary);

          @mixin focus {
            background-color: var(--accent);
            color: c.$white;
          }

          &:focus-visible {
            @include focus;
          }
          @media (hover: hover) {
            &:hover {
              @include focus;
            }
          }
          &:disabled {
            opacity: 0.35;
          }
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
