import recipe, {
  ingredients,
  method,
  mutationSource,
  title,
  editorFocus,
  blockType,
  notes,
  miseEnPlace
} from "store/index";
import { get } from "svelte/store";
import stateToRecipe from "utils/prosemirror/recipe/stateToRecipe";
import stateFromRecipe from "utils/prosemirror/recipe/stateFromRecipe";
import user from "store/user";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import plugins from "utils/prosemirror/plugins";
import schema, { NODES } from "schemas/recipe";
import { canEdit, refs, setRef } from "store/recipe";
import $$ from 'utils/dom/querySelectorAll'

import Recipe from "./Recipe.svelte";
// import Header from "./Header";
import Editor from "./Editor";
import EditorBar from "./EditorBar";
import Overview from "./Overview";
import { observeSection } from "components/Nav/Recipe/SectionJumper";

const SECTIONS = {
  OVERVIEW: {
    label: 'Overview',
  },
  INGREDIENTS: {
    label: 'Ingredients',
  },
  MISE_EN_PLACE: {
    label: 'Mise en place',
  },
  METHOD: {
    label: 'Method',
  },
  NOTES: {
    label: 'Notes',
  },
} as const;

const childNodeTypes = [
  NODES.HEADER,
  NODES.INGREDIENT,
  NODES.STEP,
  NODES.NOTE,
];

function mountEditor(editorEl) {
  setRef(editorEl, "editor");

  const view = new EditorView(
    editorEl,
    {
      state: EditorState.create({
        schema,
        plugins: plugins(),
      }),
      dispatchTransaction,
      editable() {
        return get(canEdit);
      },
    }
  );

  view.dom.addEventListener("click", onEditorClick);
  setRef(view, "view");



  setSectionRefs(editorEl)
}

const unsub = canEdit.subscribe($canEdit => {
  if (!refs.view) return;

  refs.view.setProps({editable: () => $canEdit})

  const {dispatch, state} = refs.view
  dispatch(state.tr.setMeta('forceUpdate', true))
})

function setSectionRefs(editorEl) {
  for (const section of $$(editorEl, 'section')) {
    const id = section?.dataset.section ?? null;
    if (!id || !Object.hasOwn(refs.sections, id)) continue;
    refs.sections[id] = section;
    observeSection(section);
  }
}

function onEditorClick({ target }) {
  const focusToBlockType = {
    ingredients: 'ingredient',
    miseenplace: 'ingredient',
    method: 'step',
    notes: 'note',
  }
  const nearestSection = target.closest("section");
  const focus = nearestSection?.dataset.section ?? null;
  const block = focus ? focusToBlockType[focus] ?? null : null;
  editorFocus.set(focus),
    blockType.set(block),
    refs.view.dom.removeEventListener("click", onEditorClick);
}

function getPageTitle(params, $title) {
  const recipeTitle =
    params.id != null ? ($title.length > 0 ? $title : "Untitled") : "";
  const pageTitle = `${recipeTitle}${recipeTitle.length ? " | " : ""}Cookbook`;
  return pageTitle;
}

function onExternalMutation($mutationSource) {
  if ($mutationSource !== "external" || !refs.view) return;

  const newState = stateFromRecipe(get(recipe));
  refs.view.updateState(newState), mutationSource.set("local");
}

function dispatchTransaction(transaction) {
  if (!refs.view) return;

  const $user = get(user);
  setIndexes(transaction);
  const newState = refs.view.state.apply(transaction);
  refs.view.updateState(newState);

  if (!$user || !transaction.docChanged || true === transaction.meta?.setFocus) return;

  const $recipe = stateToRecipe(newState);
  mutationSource.set("local"),
    ingredients.set($recipe.ingredients),
    miseEnPlace.set($recipe.mise_en_place),
    method.set($recipe.method),
    notes.set($recipe.notes);
}

function cleanup() {
  destroyView();
  unsub()
}

function destroyView() {
  if (!refs.view) return;
  refs.view.dom.removeEventListener("click", onEditorClick),
    refs.view?.destroy();
}

function setIndexes(transaction) {
  let changed = false;
  let index;

  const containerNodes = [NODES.INGREDIENTS, NODES.MISE_EN_PLACE, NODES.METHOD, NODES.NOTES];

  transaction.doc.descendants((node, pos) => {
    
    (containerNodes.includes(node.type.name)) && (index = 0);
    
    if (!childNodeTypes.includes(node.type.name)) return;
    
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

function initToolbar() {
  refs?.view.pluginViews[0]?.init();
}

function init() {
  return cleanup
}

export {
  Recipe as default,
  // Header,
  Overview,
  Editor,
  EditorBar,
  //
  NODES,
  SECTIONS,
  //
  
  //
  mountEditor,
  onEditorClick,
  getPageTitle,
  onExternalMutation,
  dispatchTransaction,
  init,
  initToolbar,
};
