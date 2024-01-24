import { writable } from "svelte/store";
import parseDuration from "utils/text/parseDuration";
// import { h } from "data/units/time";

// const initialState = {
//   text: "1 hour",
//   quantity: 1,
//   unit: h,
// };
const initialState = {
  text: "",
  quantity: 0,
  unit: "",
};

function durationStore(arg = initialState) {
  const { subscribe, update, set } = writable(arg);

  return {
    subscribe,
    set: (o) => {
      let parsedDuration = parseDuration(o.text);
      let newObj = {
        text: o.text,
        quantity: +parsedDuration?.quantity ?? 0,
        unit: parsedDuration?.unit?.title.toLowerCase() ?? "",
      };

      set(newObj);
    },
  };
}

export default durationStore;
