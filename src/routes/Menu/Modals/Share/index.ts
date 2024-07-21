import { recipes } from "store/index";
import { get, writable } from "svelte/store";
import { recipeId, showShareModal } from "..";

export { default as default } from "./Modal--Share.svelte";

export const refs = {
  copyButton: null,
  copyButtonLabel: null,
  timeout: null,
};

export const success = writable(false);

const defaultSwitchProps = {
  id: "menu__recipe__share__public",
  label: "Allow anyone with the link to see this recipe",
  initialValue: false,
  onToggle: toggleShared,
};
export function getSwitchProps(recipes, recipeId: string) {
  return {
    ...defaultSwitchProps,
    initialValue: recipes.filter((r) => r.id === recipeId)[0]?.shared ?? false,
  };
}

export const saving = writable(false);

export const shareLink = writable("");
export function updateShareLink($url, $recipeId) {
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
  showShareModal.set(false);
}

export function resetButton() {
  if (!refs.copyButtonLabel) return;
  refs.copyButtonLabel.innerHTML = "Copy link";
}
export function copyToClipboard() {
  navigator.clipboard.writeText(get(shareLink));
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
  showShareModal.subscribe(($show) => {
    if ($show || null == refs.timeout) return;
  
    clear();
  });
}
export function cleanup() {
  clear();
}

