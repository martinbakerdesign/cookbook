import recipe, {
  ingredients,
  method,
  mutationSource,
  name,
  editorFocus,
  blockType,
  isUserAuthor,
  loading,
} from "store/index";
import { derived, get } from "svelte/store";
import stateToRecipe from "utils/prosemirror/recipe/stateToRecipe";
import stateFromRecipe from "utils/prosemirror/recipe/stateFromRecipe";
import user from "store/user";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import plugins from "utils/prosemirror/plugins";
import schema, { recipeNodeTypes } from "schemas/recipe";
import {refs, setRef} from 'store/recipe'

export { default as default } from "./Recipe.svelte";

export { default as Header } from "./Header";
export { default as Editor } from "./Editor";
export { default as Nav } from "./Nav";
export { default as Meta } from "./Meta";

export const nodeTypes = new Map(
  Object.entries({
    header: schema.nodes[recipeNodeTypes.HEADER],
    ingredient: schema.nodes[recipeNodeTypes.INGREDIENT],
    step: schema.nodes[recipeNodeTypes.STEP],
    note: schema.nodes[recipeNodeTypes.NOTE],
  })
);

export const readonly = derived(
  [isUserAuthor, loading],
  ([$isUserAuthor, $loading]) => {
    return !$isUserAuthor || $loading;
  }
);

export function mountEditor(editor) {
  setRef(editor, 'editor')
  const view = new EditorView(editor, {
    state: EditorState.create({
      schema,
      plugins: plugins(),
    }),
    dispatchTransaction,
    editable() {
      const $user = get(user);
      return $user != null;
    },
  });
  view.dom.addEventListener("click", onEditorClick);
  setRef(view, 'view')
}

export function onEditorClick({ target }) {
  const focus = target.closest("#recipe__editor--ingredients")
    ? "ingredients"
    : target.closest("#recipe__editor--method")
      ? "method"
      : null;
  const block =
    focus === "ingredients" ? "ingredient" : focus === "method" ? "step" : null;
  editorFocus.set(focus),
    blockType.set(block),
    refs.view.dom.removeEventListener("click", onEditorClick);
}

export function getPageTitle(params) {
  const $name = get(name);
  const recipeName =
    params.id != null ? ($name.length > 0 ? $name : "Untitled") : "";
  const title = `${recipeName}${recipeName.length ? " | " : ""}Cookbook`;
  return title;
}

export function onExternalMutation($mutationSource) {
  if ($mutationSource !== "external" || !refs.view) return;

  const newState = stateFromRecipe(get(recipe));
  refs.view.updateState(newState), mutationSource.set("local");
}

export function dispatchTransaction(transaction) {
  if (!refs.view) return;

  const $user = get(user);
  setIndexes(transaction);
  let newState = refs.view.state.apply(transaction);
  refs.view.updateState(newState);

  if (!$user || !transaction.docChanged) return;

  const $recipe = stateToRecipe(newState);
  mutationSource.set("local"),
    ingredients.set($recipe.ingredients),
    method.set($recipe.method);
}

export function cleanup() {
  destroyView();
}
function destroyView() {
  if (!refs.view) return;
  refs.view.dom.removeEventListener("click", onEditorClick),
    refs.view?.destroy();
}

function setIndexes(transaction) {
  let changed = false;
  let index;

  transaction.doc.descendants((node, pos) => {
    (node.type.name === "ingredients" || node.type.name === "method") &&
      (index = 0);
    if (!Object.keys(nodeTypes).includes(node.type.name)) return;
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

export function initToolbar() {
  console.log(refs);
  refs?.view.pluginViews[0].init();
}
