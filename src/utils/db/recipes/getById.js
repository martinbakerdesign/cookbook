import { doc, getDoc } from "firebase/firestore";
import { db } from "firestore/";

export default async function getById(id) {
  try {
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const recipe = {
        id,
        ...docSnap.data(),
      };
      return recipe;
    } else {
      throw "No recipe found with id: " + id;
    }
  } catch (err) {
    throw err;
  }
}
