import { get, writable } from "svelte/store";
import { globalTags } from "store/";
import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "firestore/";
import getAllRecipes from "utils/db/recipes/getAll";
import userStore from "./user";
import uFuzzy from "@leeoniya/ufuzzy";

export default function recipeStore(initial = []) {
  const recipes = writable(initial);
  const { set, update, subscribe } = recipes;

  let recipesQueryable = []

  function filterByName(needle = "") {
    if (!needle || !needle.length) return [];

    const $recipes = get(recipes);

    const uf = new uFuzzy({
      intraMode: 1,
    });

    const idxs = uf.filter(recipesQueryable, needle);

    const filtered = $recipes.filter((recipe, i) => {
      return idxs.includes(i);
    });

    // const filtered = $recipes.filter(
    //   (recipe) => {
    //     if (!recipe.tags) return false;
    //     return recipe.name.toLowerCase().includes(needle.toLowerCase()) ||
    //     recipe.tags.some((t) => t.toLowerCase().includes(needle.toLowerCase()));
    //   });

    return filtered;
  }
  function filterByTag(query = null) {
    if (!query || !query.length) return [];

    let tag = globalTags.findById(query);

    let filtered = get(recipes).filter(({ tags }) => {
      if (!tags || !tags.length) return false;
      let matches = tags.filter((t) => {
        return (tag?.name ?? tag) === t;
      });

      return matches.length > 0;
    });

    return filtered;
  }
  function filterByTags(query = []) {
    if (!query || !query.length) return [];

    let filtered = get(recipes).filter(({ tags }) => {
      if (!tags || !tags.length || tags.length < query.length) return false;
      return tags.reduce((carry,current) => carry || query.includes(current),false);
    });

    return filtered;
  }
  function findById(id = null) {
    if (!id || !id.length) return null;

    return get(recipes).filter((r) => r.id === id)[0];
  }
  async function rename(id, name) {
    try {
      const docRef = doc(db, "recipes", id);

      let last_edited = Timestamp.now();

      await updateDoc(docRef, {
        name,
        last_edited,
      });

      update((recipes) =>
        recipes.map((r) => (r.id === id ? { ...r, name, last_edited } : r))
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function deleteRecipe(id) {
    try {
      const docRef = doc(db, "recipes", id);

      await deleteDoc(docRef);

      update((recipes) => recipes.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function toggleShare(
    id,
    shared = !get(recipes).filter((r) => r.id === id)[0].shared ?? true
  ) {
    try {
      const docRef = doc(db, "recipes", id);

      let updated = await updateDoc(docRef, {
        shared,
      });

      update((recipes) =>
        recipes.map((r) => (r.id === id ? { ...r, shared } : r))
      );
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function refresh() {
    let user = get(userStore);
    if (!user) return;
    try {
      const recipes = await getAllRecipes(user.id);

      // recipeNames = recipes.map((r) => r.name);
      // recipeTags = recipes.map((r) => r.tags.join(', '));
      recipesQueryable = recipes.map(r => `${r.name} ${r.tags.join(' ')}`)

      set(recipes);
    } catch (err) {
      throw err;
    }
  }

  return {
    refresh,
    set,
    update,
    subscribe,
    filterByName,
    filterByTags,
    filterByTag,
    findById,
    rename,
    delete: deleteRecipe,
    toggleShare,
  };
}
