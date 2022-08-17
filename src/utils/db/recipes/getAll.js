import { loadingRecipes } from "store/";
import { db } from "firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getAllRecipes(userId) {
  try {
    loadingRecipes.set(true);
    let q = query(collection(db, "recipes"), where("author", "==", userId));
    let results = await getDocs(q).then((snapshot) => {
      let r = [];
      snapshot.forEach((doc) => r.push({ ...doc.data(), id: doc.id }));
      return r;
    });

    // let results = await db
    //   .collection("recipes")
    //   .where("author", "==", userId)
    //   .get()
    //   .then((snapshot) => {
    //     let r = [];
    //     snapshot.forEach((doc) => r.push({ ...doc.data(), id: doc.id }));
    //     return r;
    //   });

    return results;
  } catch (err) {
    console.error(err);
    // throw err;
  } finally {
    loadingRecipes.set(false);
  }
}
