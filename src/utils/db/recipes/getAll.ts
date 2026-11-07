import { loadingRecipes } from "store/";
import { db } from "firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getAllRecipes(userId): Promise<Recipe[]> {
  try {
    loadingRecipes.set(true);
    // let q = query(collection(db, "recipes"), where("author", "==", userId));
    let q = query(collection(db, "recipes"));

    let results = await getDocs(q).then((snapshot) => {
      let r = [];
      snapshot.forEach((doc) => r.push({ ...doc.data(), id: doc.id}));
      return r;
    });

    results = results.map(r => ({
      ...r,
      editable: r.author === userId,
    })) as Recipe[]

    return results;
  } catch (err) {
    console.error(err);
    return [];
    // throw err;
  } finally {
    loadingRecipes.set(false);
  }
}
