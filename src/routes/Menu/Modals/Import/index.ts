import { derived, get, writable } from "svelte/store";
import createRecipe from "utils/db/recipes/createRecipe";
import scrapeRecipe from "utils/scraper";
import validateURL from "utils/validate/url";
import ImportModal from "./Modal--Import.svelte";
import { getModalStore, hideModal } from "store/modals";
import { recipes } from "store/index";
import { debounce } from "lodash";

const id = "menu__import";

const refs = {
  input: null
}

const loading = writable(false);
const saving = writable(false);
const recipe = writable(null);
const error = writable(null);
const importUrl = writable("");

let show = writable(false);

const inputDisabled = derived(
  [saving, loading],
  ([$saving, $loading]) => $saving || $loading
);
const saveButtonLabel = derived([loading, saving], ([$loading, $saving]) =>
  $loading ? "Loading..." : !$saving ? "Import" : "Importing..."
);
const saveDisabled = derived(
    [error, loading, saving, importUrl],
    ([$error, $loading, $saving, $importUrl]) => null != $error || $loading || $saving || !validateURL($importUrl)
)

function handleChange(e) {
  const $importUrl = e.target.value;
  importUrl.set($importUrl);
  if (!validateURL($importUrl)) return;
  pullRecipe();
}
const debouncedHandleChange = debounce(handleChange, 300);
async function pullRecipe() {
  loading.set(true);
  error.set(null);
  const $importUrl = get(importUrl);
  try {
    let scraped = await scrapeRecipe($importUrl);
    recipe.set(scraped);
  } catch (err) {
    console.error(err);
    recipe.set(null);
    error.set(err);
  } finally {
    loading.set(false);
  }
}
function resetForm() {
  refs.input.value = ''
  loading.set(false),
  saving.set(false),
  importUrl.set(""),
  recipe.set(null);
}
function cancel() {
  hideModal(id), resetForm();
}
async function importRecipe() {
  saving.set(true);
  const $recipe = get(recipe);
  try {
    await createRecipe($recipe);

    hideModal(id);
    recipes.refresh();
  } catch (err) {
    console.error(err);
  } finally {
    saving.set(false);
  }
}
function init () {
  show = getModalStore(id);

  const unsub = show.subscribe(($show) => {
    if ($show) return;
    resetForm()
  });
  return () => {
    unsub()
  }
}

export {
  ImportModal as default,
  //
  id,
  refs,
  //
  loading,
  saving,
  inputDisabled,
  saveButtonLabel,
  saveDisabled,
  recipe,
  error,
  //
  cancel,
  importRecipe,
  debouncedHandleChange as handleChange,
  init
};
