<script>
  import Icon from "components/Icon/Icon.svelte";
  import { addDoc } from "firebase/firestore";
  import { Timestamp } from "firebase/firestore";
  import Recipe from "store/models/recipe";
  import user from "store/user";
  import { push, replace } from "svelte-spa-router";
  import { get } from "svelte/store";
  import { recipes } from "firestore/";

  const iconProps = {
    icon: "new--20",
    size: 20,
    label: "New recipe",
    // fill: "#f5853f",
  };
  async function newRecipe() {
    try {
      push(`/new`);
      let req = await addDoc(recipes, {
        ...Recipe,
        author: get(user).id,
        created: Timestamp.now(),
      });

      replace(`/${req.id}`);
    } catch (err) {
      console.error(err);
    }
  }
</script>

<button id="header__newrecipe" on:click={newRecipe}
  ><Icon {...iconProps} /> New Recipe</button
>

<style lang="scss">
  @use "../../../../styles/colours" as c;
  @use "../../../../styles/sizes" as s;
  @use "../../../../styles/typo" as t;

  #header__newrecipe {
    font-family: inherit;
    background-color: transparent;
    outline: 0;
    border: 0;
    font-weight: 500;
    font-size: 0.9375rem;
    background-color: c.$accent;
    color: white;
    letter-spacing: calc(-0.2 / 16 * 1em);
    line-height: 1.25rem;
    padding: s.$s2;
    padding-right: s.$s3;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25em;
    border-radius: 0.375rem;
    --fill: #fff;
    --hover: #f5853f;
    transition: 75ms cubic-bezier(0.19, 1, 0.22, 1);

    @mixin focus {
      background-color: transparent;
      color: c.$accent;
      --fill: #f5853f;
      box-shadow: 0px 0px 0.5rem 0px c.$accent;
      transition-duration: 150ms;
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
</style>
