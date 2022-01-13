import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { recipe } from "./seed";

var firebaseConfig = {
  apiKey: "AIzaSyC5rjnW_tu4fLWvUWT91ctD8vQ69JNGeVE",
  authDomain: "cookbook-b1834.firebaseapp.com",
  projectId: "cookbook-b1834",
  storageBucket: "cookbook-b1834.appspot.com",
  messagingSenderId: "188349366879",
  appId: "1:188349366879:web:e643934677bf3d537f51ea",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const recipes = collection(db, "recipes");
export const ingredients = collection(db, "ingredients");
export const tags = collection(db, "tags");

export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();

const seed = false;

if (seed) {
  seedRecipe();
}

async function seedRecipe() {
  try {
    // Add a new document in collection "cities"
    const newRecipe = await setDoc(doc(recipes), recipe);
    console.log({ newRecipe });
  } catch (err) {
    console.error(err);
  }
}
