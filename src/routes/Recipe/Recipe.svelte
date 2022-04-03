<script>
  import { derived, get, writable } from "svelte/store";
  import {
    name,
    loading,
    shared,
    isUserAuthor,
    mutationSource,
    ingredients,
    method,
  } from "store/";
  import fetchRecipe from "utils/db/recipes/fetchRecipe";
  import user from "store/user";
  import Header from "components/Recipe/Header/RecipeHeader.svelte";
  import Main from "components/Recipe/Main/RecipeMain.svelte";
  import Nav from "components/Recipe/Nav/RecipeNav.svelte";
  import Transformations from "components/Recipe/Meta/RecipeMeta.svelte";
  import { replace } from "svelte-spa-router";
  import { setContext } from "svelte";
  import { EditorView } from "prosemirror-view";
  import { EditorState } from "prosemirror-state";
  import plugins from "utils/prosemirror/plugins";
  import ingredientSchema from "schemas/ingredient";
  import methodSchema from "schemas/method";
  import stateToIngredients from "utils/prosemirror/ingredients/stateToIngredients";
  import stateFromIngredients from "utils/prosemirror/ingredients/stateFromIngredients";
  import stateToMethod from "utils/prosemirror/method/stateToMethod";
  import stateFromMethod from "utils/prosemirror/method/stateFromMethod";

  export let params = { id: null };
  $: params.id && fetchRecipe(params.id);

  const redirect = derived(
    [isUserAuthor, shared],
    ([isUserAuthor, shared]) => !isUserAuthor && !shared
  );
  $: !$loading && $redirect && replace("/");

  let min = false;
  let headerH = writable(0);

  const editors = {
    ingredients: null,
    method: null,
  };
  const views = {
    ingredients: null,
    method: null,
  };

  function setIndexes(transaction) {
    let changed = false;
    transaction.doc.forEach(
      (node, offset, index) =>
        node.attrs.index !== index &&
        (!changed && (changed = true),
        transaction.setNodeMarkup(offset, undefined, {
          ...node.attrs,
          index,
        }))
    );
    return changed;
  }
  function ingredientsDispatch(transaction) {
    let view = views.ingredients;
    let indexesUpdated = setIndexes(transaction);
    let newState = view.state.apply(transaction);
    view.updateState(newState);

    if (!$user) return;
    if (transaction.mapping.from === transaction.mapping.to && !indexesUpdated)
      return;
    mutationSource.set("local"), ingredients.set(stateToIngredients(newState));
  }
  function methodDispatch(transaction) {
    const newState = views.method.state.apply(transaction);
    let indexesUpdated = setIndexes(transaction);
    views.method.updateState(newState);

    if (!$user) return;
    if (transaction.mapping.from === transaction.mapping.to && !indexesUpdated)
      return;
    mutationSource.set("local");
    method.set(stateToMethod(newState));
  }
  setContext("ingredients", {
    onMount: (editor) => {
      editors.ingredients = editor;
      views.ingredients = new EditorView(editors.ingredients, {
        state: EditorState.create({
          schema: ingredientSchema,
          plugins: plugins().ingredients,
        }),
        dispatchTransaction: ingredientsDispatch,
        editable() {
          return $user != null;
        },
      });
    },
    getViews: () => views,
  });
  setContext("method", {
    onMount: (editor) => {
      editors.method = editor;
      views.method = new EditorView(editors.method, {
        state: EditorState.create({
          schema: methodSchema,
          plugins: plugins().method,
        }),
        dispatchTransaction: methodDispatch,
        editable() {
          return $user != null;
        },
      });
    },
    getViews: () => views,
  });
  $: views.ingredients &&
    views.method &&
    $mutationSource === "external" &&
    (views.ingredients.updateState(stateFromIngredients(get(ingredients))),
    views.method.updateState(stateFromMethod(get(method))),
    mutationSource.set("local"));

  let title = "Recipe";
  $: title = `${
    params.id != null ? `${$name.length > 0 ? $name : "Untitled"} | ` : ""
  }Cookbook`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article id="recipe">
  {#if !$loading && $user}
    <Nav />
  {/if}
  <main id="recipe__main">
    <Header {min} {...{ headerH }} />
    <Main />
  </main>
  {#if !$loading && $user}
    <Transformations />
  {/if}
</article>

<style lang="scss">
  @use "../../styles/colours" as c;
  @use "../../styles/layers" as l;

  #recipe {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    overflow: hidden;
    transition: transform 150ms cubic-bezier(0.19, 1, 0.22, 1);
    background-color: var(--bg-secondary);

    &__main {
      background-color: var(--bg-primary);
      max-width: var(--main);
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      z-index: l.$content;

      @media screen and (max-width: 1440px) {
        max-width: 68rem;
      }
    }

    &.menu {
      transition-duration: 350ms;
      transform: translate3d(100vw, 0, 0);
    }
  }
</style>
