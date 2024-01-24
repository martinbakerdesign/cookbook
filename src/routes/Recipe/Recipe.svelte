<script>
  import { derived, get } from "svelte/store";
  import recipe, {
    name,
    loading,
    shared,
    isUserAuthor,
    mutationSource,
    editorFocus,
    blockType,
    ingredients,
    method,
  } from "store";
  import user from "store/user";
  import fetchRecipe from "utils/db/recipes/fetchRecipe";
  import { replace } from "svelte-spa-router";
  import { setContext } from "svelte";
  import { EditorView } from "prosemirror-view";
  import { EditorState } from "prosemirror-state";
  import plugins from "utils/prosemirror/plugins";
  import schema from "schemas/recipe";
  import stateToRecipe from "utils/prosemirror/recipe/stateToRecipe";
  import stateFromRecipe from "utils/prosemirror/recipe/stateFromRecipe";

  import Header from "components/Recipe/Header/Recipe__Header.svelte";
  import Editor from "components/Recipe/Main/RecipeMainEditor.svelte";
  import Nav from "components/Recipe/Nav/RecipeNav.svelte";
  import Meta from "components/Recipe/Meta/RecipeMeta.svelte";

  export let params = { id: null };
  $: params.id && fetchRecipe(params.id);

  let nodeTypes = ["header", "ingredient", "step"];

  // const redirect = derived(
  //   [isUserAuthor, shared],
  //   ([isUserAuthor, shared]) => !isUserAuthor && !shared
  // );
  // $: !$loading && $redirect && replace("/");

  let editor, view;

  setContext("recipe", {
    onMount: (e) => {
      editor = e;
      view = new EditorView(editor, {
        state: EditorState.create({
          schema,
          plugins: plugins(),
        }),
        dispatchTransaction: dispatch,
        editable() {
          return $user != null;
        },
      });
    },
    getView: () => view,
  });
  $: view &&
    $mutationSource === "external" &&
    (view.updateState(stateFromRecipe(get(recipe))),
    mutationSource.set("local"));

  let title = "Recipe";
  $: title = `${
    params.id != null ? `${$name.length > 0 ? $name : "Untitled"} | ` : ""
  }Cookbook`;

  function setIndexes(transaction) {
    let changed = false;
    let index;

    transaction.doc.descendants((node, pos) => {
      (node.type.name === "ingredients" || node.type.name === "method") &&
        (index = 0);
      if (!nodeTypes.includes(node.type.name)) return;
      node.attrs.index !== index &&
        (!changed && (changed = true),
        transaction.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          index,
        }));
      index++;
    });

    return changed;
  }
  function dispatch(transaction) {
    setIndexes(transaction);
    let newState = view.state.apply(transaction);
    view.updateState(newState);

    if (!$user || !transaction.docChanged) return;

    let recipe = stateToRecipe(newState);
    mutationSource.set("local"),
      ingredients.set(recipe.ingredients),
      method.set(recipe.method);
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<article id="recipe">
  {#if !$loading && $user}
    <Nav />
  {/if}
  <main id="recipe__main">
    <Header />
    <Editor />
  </main>
  <!-- TODO Add notes -->
  {#if !$loading}
    <Meta />
  {/if}
  <!-- {#if !$loading && $user}
    <Transformations />
  {/if} -->
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
    z-index: l.$content;

    &__main {
      --pad-x: 3.25rem;
      max-width: 54rem;
      background-color: var(--bg-primary);
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      
      @media screen and (min-width: 1440px) {
        --pad-x: 5.25rem;
        max-width: var(--main);
      }
    }

    &.menu {
      transition-duration: 350ms;
      transform: translate3d(100vw, 0, 0);
    }
  }
</style>
