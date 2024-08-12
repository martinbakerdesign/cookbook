import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { recipe } from "./seed";

const keys = {
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
}

console.log('Setting up Firebase config', keys);

if (!keys.FIREBASE_API_KEY || !keys.FIREBASE_API_KEY.length) {
  throw new Error("Missing Firebase API Key");
} else if (!keys.FIREBASE_AUTH_DOMAIN || !keys.FIREBASE_AUTH_DOMAIN.length) {
  throw new Error("Missing Firebase Auth Domain");
} else if (!keys.FIREBASE_PROJECT_ID || !keys.FIREBASE_PROJECT_ID.length) {
  throw new Error("Missing Firebase Project ID");
} else if (!keys.FIREBASE_STORAGE_BUCKET || !keys.FIREBASE_STORAGE_BUCKET.length) {
  throw new Error("Missing Firebase Storage Bucket");
} else if (!keys.FIREBASE_MESSAGING_SENDER_ID || !keys.FIREBASE_MESSAGING_SENDER_ID.length) {
  throw new Error("Missing Firebase Messaging Sender ID");
} else if (!keys.FIREBASE_APP_ID || !keys.FIREBASE_APP_ID.length) {
  throw new Error("Missing Firebase App ID");
}

const firebaseConfig = {
  apiKey: keys.FIREBASE_API_KEY,
  authDomain: keys.FIREBASE_AUTH_DOMAIN,
  projectId: keys.FIREBASE_PROJECT_ID,
  storageBucket: keys.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: keys.FIREBASE_MESSAGING_SENDER_ID,
  appId: keys.FIREBASE_APP_ID
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
