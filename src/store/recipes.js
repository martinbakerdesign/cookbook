import { get, writable } from "svelte/store";
import { globalTags } from "store/";
import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "firestore/";
import getAllRecipes from "utils/db/recipes/getAll";
import userStore from "./user";

export default function recipeStore(initial = []) {
  const recipes = writable(initial);
  const { set, update, subscribe } = recipes;

  function filterByName(Name = "") {
    if (!Name || !Name.length) return [];

    let name = Name.toLowerCase();

    const _recipes = get(recipes);

    let filtered = _recipes.filter(
      (recipe) => {
        if (!recipe.name && !recipe.tags) return false;

        return recipe.name.toLowerCase().includes(name) ||
        recipe.tags.filter((t) => t.toLowerCase().includes(name)).length
      });

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
      let recipes = await getAllRecipes(user.id);

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
