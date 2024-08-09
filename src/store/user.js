import { get, writable } from "svelte/store";
import { auth, providerGoogle, providerFacebook } from "firestore/";
import { signInWithPopup } from "firebase/auth";
import { push } from "svelte-spa-router";

const initial = null;
export const checked = writable(false);

function userStore() {
  const { subscribe, set, update } = writable(initial);

  async function signIn(provider = "GOOGLE") {
    try {
      let result = await signInWithPopup(
        auth,
        provider === "GOOGLE" ? providerGoogle : providerFacebook
      );

      let { user } = result;

      set({ name: user.displayName, id: user.uid, thumb: user.photoURL });
    } catch (err) {
      onError(err);
    }
  }
  function signOut() {
    try {
      auth.signOut();
      push("/");
      set(null);
    } catch (err) {
      onError(err);
    }
  }

  return {
    subscribe,
    signIn,
    signOut,
    set,
  };
}

auth.onAuthStateChanged((u) => {
  if (!get(checked)) {
    checked.set(true);
  }

  user.set(
    u != null ? { name: u.displayName, id: u.uid, thumb: u.photoURL } : null
  );
});

function onError(err) {
  let { code, message, email, credential } = err;
  console.error(err);
  new Error(`${code}: ${message}`)
}

const user = userStore();

export {
  user as default
}
