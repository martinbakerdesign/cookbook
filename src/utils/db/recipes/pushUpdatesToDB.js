import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "firestore/";
import { pushing, cueTimeout, lastSaved, onCloud, cuedChange } from "store/";
import { get } from "svelte/store";

export default async function pushUpdatesToDB() {
  const $cuedChange = get(cuedChange);
  const id = $cuedChange.id;

  if (!$cuedChange || !id) return;

  const data = { ...$cuedChange, last_edited: Timestamp.now(), name: $cuedChange.title };
  
  pushing.set(true);
  
  try {
    const docRef = doc(db, "recipes", id);
    
    // console.log("Saving ...", data);
    await updateDoc(docRef, data);
    // console.log("Saved");

    onCloud.set(data),
      cueTimeout.clear(),
      cuedChange.reset(),
      lastSaved.set(Date.now());
  } catch (err) {
    console.error(err);
  } finally {
    pushing.set(false);
  }
}
