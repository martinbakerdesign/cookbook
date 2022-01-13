import { doc, getDoc } from "firebase/firestore";
import { db } from "firestore/";

export default async function getById(id) {
  console.log("getById: ", id);
  try {
    let docRef = doc(db, "recipes", id);
    let recipe = await getDoc(docRef).then(async (doc) => {
      if (doc.exists) {
        return {
          id,
          ...doc.data(),
        };
      } else {
        throw "No recipe found with id: " + id;
      }
    });
    // let recipe = await recipes
    //   .doc(id)
    //   .get()
    //   .then(async (doc) => {
    //     if (doc.exists) {
    //       return {
    //         id,
    //         ...doc.data(),
    //       };
    //     } else {
    //       throw "No recipe found with id: " + id;
    //     }
    //   });

    return recipe;
  } catch (err) {
    throw err;
  }
}
