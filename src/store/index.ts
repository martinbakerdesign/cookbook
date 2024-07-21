import { writable, derived, get, readable } from "svelte/store";
import amountStore from "./amount";
import ingredientStore from "./ingredients";
import durationStore from "./duration";
import pushUpdatesToDB from "utils/db/recipes/pushUpdatesToDB";
import bgs from "data/bgs";
import searchQueryStore from "./searchQuery";
import globalTagsStore from "./globalTags";
import user from "./user";
import recipeStore from "./recipes";
import tagsStore from "./tags";
import cuedChangeStore from "./cuedChange";
import cueTimeoutStore from "./cueTimeout";
import descriptionStore from "./description";
import methodStore from "./method";

export {default as localStorage} from './localStorage'

export const bg = readable(bgs[Math.floor(Math.random() * bgs.length)]);

export const url = readable("https://cookbook-b1834.web.app");

/**
 * Tags
 */
export const globalTags = globalTagsStore([]);

/**
 * Menu
 */
export const loadingRecipes = writable(true),
  searchQuery = searchQueryStore(),
  tagsQuery = writable(""),
  tagsFilter = writable([]);

/**
 * Recipe
 */
export const id = writable<string>("");
export const created = writable<string>("");
export const name = writable<string>("");
export const description = descriptionStore();
export const amount = amountStore(); // aka yield but yield is a reserved word
export const author = writable<string>('');
export const shared = writable<boolean>(false);
export const duration = durationStore();
export const tags = tagsStore();
export const ingredients = ingredientStore();
export const method = methodStore();
export const src = writable<string>("");

const recipe = derived(
  [
    id,
    created,
    name,
    description,
    amount,
    duration,
    tags,
    ingredients,
    method,
    shared,
    author,
    src,
  ],
  ([
    id,
    created,
    name,
    description,
    amount,
    duration,
    tags,
    ingredients,
    method,
    shared,
    author,
    src,
  ]) => ({
    id,
    created,
    name,
    description,
    amount,
    duration,
    tags,
    ingredients,
    method,
    shared,
    author,
    src,
  })
);
export default recipe;

export const isUserAuthor = derived(
  [user, recipe],
  ([user, recipe]) => user && user.id === recipe.author
);

/**
 * Recipes
 */
export const recipes = recipeStore([]);

/**
 * Global
 */
export const loading = writable(false);

/**
 * Editor
 */
const timeout = 500;
export const mutationSource = writable("local"),
  cuedChange = cuedChangeStore(),
  cueTimeout = cueTimeoutStore(),
  onCloud = writable(false),
  pushing = writable(false),
  lastSaved = writable(null),
  scaleFactor = writable("1.0"),
  blockType = writable(null),
  currentUnit = writable(null),
  editorFocus = writable(null);
recipe.subscribe((r) => {
  if (
    get(loading) ||
    JSON.stringify(get(cuedChange)) === JSON.stringify(r) ||
    JSON.stringify(r) === JSON.stringify(get(onCloud))
  )
    return;
  cueTimeout.clear(),
    cuedChange.set(r),
    cueTimeout.set(pushUpdatesToDB, timeout);
});

export {default as settings} from './settings'

export function clearData() {
  id.set(""),
    created.set(""),
    name.set(""),
    amount.set(""),
    description.set(""),
    duration.set({ text: "", quantity: 0, unit: "" }),
    tags.set([]),
    ingredients.set([]),
    method.set([]),
    shared.set(false),
    author.set(""),
    lastSaved.set(null),
    cueTimeout.clear(),
    cuedChange.reset(),
    pushing.set(false),
    scaleFactor.set("1.0"),
    src.set(""),
    onCloud.set(null),
    blockType.set(null),
    currentUnit.set(null),
    editorFocus.set(null);
}

const subs = [
  user.subscribe((u) => {
    if (u == null) return;
    globalTags.hydrate();
  }),
];

export function unsubGlobalTags() {
  subs.forEach((u) => u());
}
