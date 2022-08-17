import { addDoc, Timestamp } from "firebase/firestore";
import user from "store/user";
import { get } from "svelte/store";
import { recipes } from "firestore";
import getById from "./getById";

export default async function duplicateRecipe(originalId, appendCopy = true) {
  try {
    let contents = await getById(originalId);

    let name = contents.name + (appendCopy ? " - Copy" : "");

    let duplicate = await addDoc(recipes, {
      ...contents,
      created: Timestamp.now(),
      last_edited: Timestamp.now(),
      name,
      author: get(user).id,
    });

    return duplicate;
  } catch (err) {
    console.error(err);
  }
}
