import { addDoc, type DocumentReference, Timestamp, type WithFieldValue } from "firebase/firestore";
import user from "store/user";
import { get } from "svelte/store";
import { recipes } from "firestore";
import RecipeModel from "store/models/recipe";
import getById from "./getById";

export default async function duplicateRecipe(originalId: RecipeID, appendCopy = true): Promise<DocumentReference<Recipe>|null> {
  try {
    const contents = await getById(originalId);

    const title = contents.title + (appendCopy ? " - Copy" : "") as RecipeTitle;

    const duplicate = await addDoc<Recipe>(recipes, {
      ...RecipeModel,
      ...contents,
      created: Timestamp.now(),
      last_edited: Timestamp.now(),
      title,
      author: get(user).id,
    } as WithFieldValue<Recipe>);

    return duplicate;
  } catch (err) {
    console.error(err);
    return null;
  }
}
