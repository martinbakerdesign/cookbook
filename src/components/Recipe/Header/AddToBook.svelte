<script>
  import recipe, { loading } from "store";
  import duplicateRecipe from "utils/db/recipes/duplicateRecipe";
  import { replace } from "svelte-spa-router";

  let cloning = false;

  let disabled = true;
  $: disabled = $loading || cloning;

  async function cloneRecipe() {
    try {
      cloning = true;

      let cloned = await duplicateRecipe($recipe.id, false);

      replace(`/${cloned.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      cloning = false;
    }
  }
</script>

<button
  id="add-recipe"
  type="button"
  {disabled}
  on:click={cloneRecipe}
  class:loading={$loading}
  >{!cloning ? "+ Add recipe to my collection" : "Adding recipe..."}</button
>

<style lang="scss">
  @use "../../../styles/colours" as colours;
  @use "../../../styles/sizes" as sizes;

  #add-recipe {
    --colour: var(--accent);
    &[disabled] {
      --colour: var(--contrast);
    }
    margin-top: sizes.$s4;
    padding: sizes.$s2 sizes.$s3;
    border: 0;
    font-size: 0.875rem;
    letter-spacing: calc(-0.2 / 14 * 1em);
    line-height: 1.25rem;
    color: var(--colour);
    user-select: none;
    font-weight: 500;
    font-family: inherit;
    background-color: transparent;
    outline: 0;
    cursor: pointer;
    border-radius: 0.375rem;
    box-shadow: 0 0 0 0.0625rem inset var(--colour);

    &:focus-visible {
      box-shadow: 0 0 0 0.125rem inset var(--colour);
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--colour);
        color: var(--white);
      }
    }

    &.loading {
      display: none;
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
