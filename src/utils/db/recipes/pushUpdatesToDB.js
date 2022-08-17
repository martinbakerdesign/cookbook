import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "firestore/";
import { pushing, cueTimeout, lastSaved, onCloud, cuedChange } from "store/";
import { get } from "svelte/store";

export default async function pushUpdatesToDB() {
  let _cuedChange = get(cuedChange);
  if (!_cuedChange || !_cuedChange.id) return;
  let toPush = { ..._cuedChange, last_edited: Timestamp.now() };

  pushing.set(true);

  try {
    // console.log("Saving ...", toPush);
    await updateDoc(doc(db, "recipes", _cuedChange.id), toPush);
    // console.log("Saved");

    onCloud.set(toPush),
      cueTimeout.clear(),
      cuedChange.reset(),
      lastSaved.set(Date.now());
  } catch (err) {
    console.error(err);
  } finally {
    pushing.set(false);
  }
}
