import { addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import Recipe from "store/models/recipe";
import user from "store/user";
import { get } from "svelte/store";
import { recipes } from "firestore/";

export default async function createRecipe(contents = {}) {
  try {
    let recipe = await addDoc(recipes, {
      ...Recipe,
      author: get(user).id,
      created: Timestamp.now(),
      last_edited: Timestamp.now(),
      ...contents,
    });

    return recipe;
  } catch (err) {
    console.error(err);
  }
}
