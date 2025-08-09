import { recipes } from "store/index";
import { get, writable } from "svelte/store";
import { recipeId } from "..";
import { hideModal, getModalStore } from "store/modals";
import getRecipeByID from "utils/recipes/getRecipeByID";

export { default as default } from "./Modal--Share.svelte";

export const refs = {
  input: null,
  copyButton: null,
  copyButtonLabel: null,
  timeout: null,
};

export const id = 'menu__share';

export const success = writable(false);

export const defaultSwitchProps = {
  id: "menu__recipe__share__public",
  label: "Allow anyone with the link to see this recipe",
  value: false,
  disabled: true,
  icon: 'pencil--20',
  onToggle: toggleShared,
};

let switchProps = {
  ...defaultSwitchProps
}
export function getSwitchProps(recipe: Recipe|null) {
  switchProps = {
    ...switchProps,
    value: true === (recipe?.shared ?? false),
    disabled: null === recipe,
  }

  return switchProps;
}

export const saving = writable(false);

export function getShareLink($url, $recipeId) {
  return `${$url}/#/${$recipeId}`;
}

export async function toggleShared(value) {
  const $recipeId = get(recipeId);

  try {
    saving.set(true);
    await recipes.toggleShare($recipeId, value);

    saving.set(false);
  } catch (err) {
    console.error(err);
  }
}
export function selectAll(e) {
  e.target.select();
}
export function cancel() {
  hideModal(id)
}

export function resetButton() {
  if (!refs.copyButtonLabel) return;
  refs.copyButtonLabel.innerHTML = "Copy link";
}
export function copyToClipboard() {
  navigator.clipboard.writeText(refs.input.value);
  onLinkCopied();
}
export function onLinkCopied() {
  clear();
  refs.copyButtonLabel &&
    (refs.copyButtonLabel.innerHTML = "Link copied");
  success.set(true);
  refs.timeout = setTimeout(clear, 3000);
}
export function clear() {
  refs.timeout && (clearTimeout(refs.timeout), (refs.timeout = null));
  saving.set(false);
  success.set(false);
  resetButton();
}
export function init () {
  getModalStore(id)?.subscribe(($show) => {
    if ($show || null == refs.timeout) return;
  
    clear();
  });

  return cleanup;
}
function cleanup() {
  clear();
}