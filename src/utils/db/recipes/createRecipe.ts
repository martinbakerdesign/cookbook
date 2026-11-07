import { addDoc, type DocumentReference, Timestamp, WithFieldValue } from "firebase/firestore";
import { recipes } from "firestore/";
import RecipeModel from "store/models/recipe";
import user from "store/user";
import { get } from "svelte/store";

export default async function createRecipe(contents = {}): Promise<DocumentReference<Recipe>|null> {
  try {
    const recipeReference = await addDoc(recipes, {
      ...RecipeModel,
      author: get(user).id,
      created: Timestamp.now(),
      last_edited: Timestamp.now(),
      ...contents,
    } as WithFieldValue<Recipe>);

    return recipeReference;
  } catch (err) {
    console.error(err);
    return null;
  }
}
