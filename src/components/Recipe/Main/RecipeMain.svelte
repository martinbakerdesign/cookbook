<script>
  import Ingredients from "./Ingredients/Ingredients.svelte";
  import Method from "./Method/Method.svelte";
  import "./MainSection.scss";
  import { setContext } from "svelte";
  import { EditorView } from "prosemirror-view";
  import { EditorState } from "prosemirror-state";
  import methodSchema from "./Method/schema";
  import { method, ingredients, mutationSource } from "store/";
  import proseToMethod from "utils/prosemirror/stateToMethod";
  import ingredientsSchema from "./Ingredients/schema";
  import proseToIngredients from "utils/prosemirror/stateToIngredients";
  import { get } from "svelte/store";
  import plugins from "./Prosemirror/plugins";
  import stateFromIngredients from "./Prosemirror/stateFromIngredients";
  import stateFromMethod from "./Prosemirror/stateFromMethod";
  // import IngredientView from "./Ingredients/Views/IngredientView";
  // import HeaderView from "./Ingredients/Views/HeaderView";
  // import pastePlugin from "./Ingredients/handlePaste";

  let editors = {
    ingredients: null,
    method: null,
  };
  let views = {
    ingredients: null,
    method: null,
  };

  setContext("ingredients", {
    onMount: (editor) => {
      editors.ingredients = editor;
      views.ingredients = new EditorView(editors.ingredients, {
        state: EditorState.create({
          schema: ingredientsSchema,
          plugins: plugins.ingredients,
        }),
        dispatchTransaction: ingredientsDispatch,
      });
    },
    getView: () => views.ingredients,
  });
  setContext("method", {
    onMount: (editor) => {
      editors.method = editor;
      views.method = new EditorView(editors.method, {
        state: EditorState.create({
          schema: methodSchema,
          plugins: plugins.method,
        }),
        dispatchTransaction: methodDispatch,
      });
    },
    getView: () => views.method,
  });

  $: views.ingredients &&
    views.method &&
    $mutationSource === "external" &&
    (views.ingredients.updateState(stateFromIngredients(get(ingredients))),
    views.method.updateState(stateFromMethod(get(method))),
    mutationSource.set("local"));

  function ingredientsDispatch(transaction) {
    let view = views.ingredients;
    const newState = view.state.apply(transaction);
    view.updateState(newState);

    if (transaction.mapping.from === transaction.mapping.to) return;
    mutationSource.set("local");
    ingredients.set(proseToIngredients(newState));
  }
  function methodDispatch(transaction) {
    const newState = views.method.state.apply(transaction);
    views.method.updateState(newState);
    if (transaction.mapping.from === transaction.mapping.to) return;
    mutationSource.set("local");
    method.set(proseToMethod(newState));
  }
</script>

<main>
  <Ingredients />
  <Method />
</main>

<style lang="scss">
  @import "../../../styles/sizes.scss";
  @import "../../../styles/typo.scss";
  @import "../../../styles/colours.scss";

  main {
    display: grid;
    grid-template-columns: 26.25rem 1fr;
    align-items: start;
    height: 100vh;
    flex: 1;
    overflow: hidden;
  }
</style>
