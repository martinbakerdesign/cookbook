import { derived, writable } from "svelte/store";
import { useSetRef } from "utils/refs";
import { isUserAuthor, loading, tags } from ".";

type RecipeSection = {
  label: string;
};
type RecipeSectionOption = {
  value: string;
  label: string;
};

const MODES = {
  EDIT: "EDIT",
  READ: "READ",
} as const;
type Mode =  ObjectValues<typeof MODES>;

const RecipeSections = {
  OVERVIEW: {
    label: "Overview",
  },
  INGREDIENTS: {
    label: "Ingredients",
  },
  MISE_EN_PLACE: {
    label: "Mise en Place",
  },
  METHOD: {
    label: "Method",
  },
  NOTES: {
    label: "Notes",
  },
} as const;

const RecipeSectionOptions = Object.entries(RecipeSections).map(
  ([value, option]) => ({ ...option, value })
) as RecipeSectionOption[];

const refs = {
  editor: null,
  view: null,
  editorEl: null,
  toolbar: null,
  editorActions: {
    undo: null,
    redo: null,
    degrees: null,
  },
  sections: Object.fromEntries(
    Object.keys(RecipeSections).map((key) => [key, null])
  ),
};
const setRef = useSetRef(refs);

const mode = writable<Mode>(MODES.READ);

const focusedSection = writable(RecipeSectionOptions[0].value);

const readonly = derived(
  [isUserAuthor, loading],
  ([$isUserAuthor, $loading]) => {
    return !$isUserAuthor || $loading;
  }
);
const canEdit = derived(
  [readonly, mode],
  ([$readonly, $mode]) => !$readonly && $mode === MODES.EDIT
)

function addTag (e) {
  tags.add(e.target.dataset.tag);
}
function removeTag (e) {
  const button = e.target.closest('button');
  const tagToRemove = button.dataset.tag;
  if(!tagToRemove) return;
  tags.remove(tagToRemove);
}

export {
  type RecipeSection,
  type RecipeSectionOption,
  type Mode,
  MODES,
  RecipeSections,
  RecipeSectionOptions,
  //
  refs,
  //
  mode,
  focusedSection,
  readonly,
  canEdit,
  //
  setRef,
  addTag,
  removeTag,
};
