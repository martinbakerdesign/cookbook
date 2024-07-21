<script>
  import Icon from "components/Icon/Icon.svelte";
  import { push, replace } from "svelte-spa-router";
  import createRecipe from "utils/db/recipes/createRecipe";

  const iconProps = {
    icon: "new--20",
    size: 20,
    label: "New recipe",
    // fill: "#f5853f",
  };
  async function newRecipe() {
    try {
      push(`/new`);
      let newRecipe = await createRecipe();

      replace(`/${newRecipe.id}`);
    } catch (err) {
      console.error(err);
    }
  }
</script>

<button
  id="header__newrecipe"
  class="menu__header__button menu__header__button--primary"
  on:click={newRecipe}><Icon {...iconProps} /> New Recipe</button
>

<style lang="scss">
</style>
