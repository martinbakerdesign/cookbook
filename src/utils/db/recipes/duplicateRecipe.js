import { addDoc, Timestamp } from "firebase/firestore";
import user from "store/user";
import { get } from "svelte/store";
import { recipes } from "firestore";
import getById from "./getById";

export default async function duplicateRecipe(originalId, appendCopy = true) {
  try {
    const contents = await getById(originalId);

    const title = contents.title + (appendCopy ? " - Copy" : "");

    const duplicate = await addDoc(recipes, {
      ...contents,
      created: Timestamp.now(),
      last_edited: Timestamp.now(),
      title,
      author: get(user).id,
    });

    return duplicate;
  } catch (err) {
    console.error(err);
  }
}
