import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { recipe } from "./seed";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
