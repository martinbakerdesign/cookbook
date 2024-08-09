import { writable } from "svelte/store";

export { default as default } from "./Animation.svelte";

export { default as animFrames } from "./animFrames";

export const frame = writable("");

let it = 0;
let interval;

export function getViewbox(animation: string) {
  return animation.includes("--")
    ? parseInt(animation.split("--")[animation.split("--").length - 1])
    : 64;
}

export function start(frames, intervalDuration) {
  if (!frames) return;

  it = 0;
  frame.set(frames[it]);

  const intervalCallback = getIntervalCallback(frames);
  interval = setInterval(intervalCallback, intervalDuration);
}

export function cleanup() {
  clearInterval(interval);
  interval = null;
  it = 0;
}

function getIntervalCallback(frames) {
  return () => {
    it = (it + 1) % frames.length;
    frame.set(frames[it]);
  };
}
