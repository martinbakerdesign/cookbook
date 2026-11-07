import { doc, DocumentReference, getDoc } from "firebase/firestore";
import { db } from "firestore/";

export default async function getById(id: RecipeID) {
  try {
    const docRef = doc(db, "recipes", id) as DocumentReference<Recipe>;
    const docSnap = await getDoc<Recipe>(docRef);

    if (docSnap.exists()) {
      let recipeData = docSnap.data();
      
      const recipe = {
        id,
        ...recipeData,
      } as Recipe;

      return recipe;
    } else {
      throw "No recipe found with id: " + id;
    }
  } catch (err) {
    throw err;
  }
}
