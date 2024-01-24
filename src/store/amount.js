import { writable } from "svelte/store";
import parseAmount from "utils/text/parseAmount";

// const initialState = { text: "1 serving", quantity: 1, unit: "serving" };
// const initialState = { text: "", quantity: 1, unit: "" };
const initialState = "";

function amountStore(arg = initialState) {
  const { subscribe, set, update } = writable(arg);

  // let parsedAmount;
  // function set(o) {
  //   parsedAmount = parseAmount(o);

  //   _set({
  //     text: o,
  //     quantity: parsedAmount?.quantity ?? 0,
  //     unit: parsedAmount?.unit ?? "",
  //   });
  // }

  return {
    subscribe,
    set,
    reset: () => set(initialState),
  };
}

export default amountStore;
