import { writable } from "svelte/store";

const preferences = writable({
  fractions: true,
});

export default preferences;
