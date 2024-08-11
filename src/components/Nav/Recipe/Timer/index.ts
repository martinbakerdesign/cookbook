import { get, writable } from "svelte/store";
import timer, {
  // 
  STATES,
  ACTIONS,
  type STATE,
  type ACTION,
  //
  state,
  dispatch
} from 'store/timer'
import { milliseconds, ObjectValues } from "types";
import {toggleWidget, WIDGETS} from '..'

import Timer from "./Timer";

import TimerComponent from "./Nav--Recipe__Timer.svelte";
import TimerComponentDefaultState from "./Nav--Recipe__Timer--Default.svelte";
import TimerComponentActiveState from "./Nav--Recipe__Timer--Active.svelte";
import TimerComponentCompleteState from "./Nav--Recipe__Timer--Complete.svelte";
import TimerComponentToggle from "./Nav--Recipe__Timer__Toggle.svelte";
import Alarm from "components/Alarm";

type TimerCallback = Function;

const refs = {
  start: null,
  stop: null,
  info: null,
  input: null,
  input_hrs: null,
  input_mins: null,
  input_secs: null,
  toggle: null,
  toggle_hrs: null,
  toggle_mins: null,
  toggle_secs: null,
  toggle_progress: null,
  notification: null,
};

const duration = writable(5 * 60 * 1000);

let keyDownValue = null,
  keyDownInputName = null;

function setRef(el: Element | null, key: ObjectValues<typeof refs>) {
  if (!Object.keys(refs).includes(key)) return;
  refs[key] = el;
}
function setRefBuilder (key: ObjectValues<typeof refs>) {
    return {
      action: (el: Element | undefined) => {
        if (!Object.hasOwn(refs, key)) return;
        refs[key] = el;
      }
    }
}
function prettyTimeString(duration: milliseconds) {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m ` : ""}${seconds ? `${seconds}s` : ""}`;
}
function splitTimeString(duration: milliseconds) {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  return [hours, minutes, seconds];
}
function onDurationKeypress(e) {
  if (get(state) !== STATES.DEFAULT) return;
  if (!hasAllInputRefs()) return;

  if (isTouch) return;

  if (isNumberKey(e) || isRemoveKey(e)) return;

  e.preventDefault();

  timer.start();
}
function onSegmentPointerUp(e) {
  if (!isTouch) return;

  keyDownValue = e.target.textContent;
  keyDownInputName = e.target.dataset.name;
  return;
}
function onDurationInput(e) {
  if (get(state) !== STATES.DEFAULT) return;
  if (!hasAllInputRefs()) return;

  if (isTouch) {
    onTouchKeyup(e);
  }

  for (const key of ["hrs", "mins", "secs"]) {
    const refKey = `input_${key}`;
    if (!isInvalidInput(refs[refKey].textContent)) continue;
    refs[refKey].textContent = '0'
  }
}
function onDurationChange () {
  const values = getValues();

  const hrs = parseInt(values[0] ?? 0) * 60 * 60 * 1000;
  const mins = parseInt(values[1] ?? 0) * 60 * 1000;
  const secs = parseInt(values[2] ?? 0) * 1000;

  setDuration(hrs + mins + secs);
}
function getValues () {
  const values = [
    refs.input_hrs.textContent,
    refs.input_mins.textContent,
    refs.input_secs.textContent,
  ].map((v) => v && v.length > 0 && !isNaN(parseInt(v)) ? v : '0');

  return values;
}
function onTouchKeyup(e) {
  if (!isTouch) return;
  if (get(state) !== STATES.DEFAULT) return;
  if (!hasAllInputRefs()) return;
  const target = refs[`input_${keyDownInputName}`];
  if (!target) return;

  try {
    if (!target) return;
    const value = target.textContent;
    if (!value.length) {
      target.textContent = "0";
      return;
    }
    if (isDelete(keyDownValue, value)) {
      e.preventDefault();
      return;
    }

    const [index, char] = diff(keyDownValue, value);
    if (isNumberKey({ key: char })) return;

    target.textContent = removeChar(target.textContent, index);
  } catch (err) {
    console.error(err);
  } finally {
    keyDownValue = target.textContent;
  }
}
function isDelete(pre, post) {
  return post.length <= pre.length;
}
function diff(pre, post) {
  let index = 0;
  for (const char of post.split("")) {
    if (char !== pre[index]) {
      return [index, char];
    }
    index++;
  }
}
function removeChar(str, index) {
  return str.slice(0, index) + str.slice(index + 1);
}

function setDuration(newDuration: milliseconds, autoPlay = false) {
  if (!timer) return;
  if (get(state) !== STATES.DEFAULT) {
    timer.stop();
  }
  duration.set(newDuration);
  timer.setDuration(newDuration);
  autoPlay && timer.start();
}

function isLongZero(value) {
  return !parseInt(value) && value.length > 2;
}
function isInvalidInput(value) {
  const isEmpty = value === "" || null == value;
  return isEmpty || isNaN(parseInt(value));
}
function hasAllInputRefs() {
  return !["input_hrs", "input_mins", "input_secs"].some(
    (key) => null == refs[key]
  );
}
function isNumberKey(event) {
  const key = event?.key ?? "null";
  const keyCode = event.keyCode;
  return "0123456789".includes(key);
}
function isArrowKey(event) {
  const key = event?.key ?? "null";
  const keyCode = event.keyCode;
  return key.includes("Arrow");
}
function isRemoveKey(event) {
  return ["Backspace", "Delete"].includes(key);
}

const alarm = new Alarm()
let notiPermission = window?.Notification ? window?.Notification?.permission : "denied";
function enableBrowserNotifications() {
  if (Notification && notiPermission !== "granted") {
    Notification.requestPermission().then((status) => {
      notiPermission = status;
    });
  }
}

function soundAlarm() {
  alarm.play();
  if (notiPermission !== "granted") return;

  refs.notification = new Notification("Time's up!", {
    // badge: ,
    // icon: ,
    // image: ,
    tag: "Cookbook",
    vibrate: [200, 100, 200, 100, 200, 100],
    requireInteraction: true,
  });
  refs.notification.addEventListener("close", dismissAlarm);
}

function dismissAlarm() {
  alarm.stop();
  dispatch(ACTIONS.DISMISS);
  if (!refs.notification) return;

  refs.notification?.close();
  refs.notification = null;
}

function togglePlayPause() {
  const isPaused = get(state) === STATES.PAUSED;
  timer[isPaused ? "resume" : "pause"]();
}

function toggleTimer () {
  toggleWidget(WIDGETS.TIMER);
}

function getCaretPosition(editableDiv) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const clonedRange = range.cloneRange();
  clonedRange.selectNodeContents(editableDiv);
  clonedRange.setEnd(range.endContainer, range.endOffset);

  const cursorPosition = clonedRange.toString().length;
  return cursorPosition;
}

function updateToggleTime(elapsed) {

  const [hh, mm, ss] = splitTimeString(
    timer.duration - Math.floor(elapsed / 1000) * 1000
  );

  let prevVisible = false;
  for (const [key, value] of [
    ["hrs", hh],
    ["mins", mm],
    ["secs", ss],
  ]) {
    const refKey = `toggle_${key}`;
    if (!refs[refKey]) return;
    const hidden = !(prevVisible || parseInt(value) > 0);
    prevVisible = !hidden;
    refs[refKey].hidden = hidden;
    refs[refKey].setAttribute("aria-hidden", hidden);
    if (!hidden) {
      refs[refKey].textContent = value;
    }
  }
}

function updateProgressBar(progress) {
  refs?.toggle_progress?.style.setProperty("--progress", progress);
}

function setTouchState () {
    isTouch.set(true)
}

function init () {
  window.addEventListener('touch', setTouchState)

  return () => {
    window.removeEventListener('touch', setTouchState)
    timer?.stop()
  }
};

function startTimer () {
  onDurationChange();

  timer.start();
}

export {
  TimerComponent as default,
  TimerComponentDefaultState as TimerDefault,
  TimerComponentActiveState as TimerActive,
  TimerComponentCompleteState as TimerComplete,
  TimerComponentToggle as Toggle,
  Timer,
  //
  STATES,
  ACTIONS,
  type STATE,
  type ACTION,
  type TimerCallback,
  //
  refs,
  state,
  duration,
  isTouch,
  alarm,
  //
  setRef,
  setRefBuilder,
  onSegmentPointerUp,
  onDurationKeypress,
  onDurationInput,
  onDurationChange,
  setDuration,
  dismissAlarm,
  togglePlayPause,
  splitTimeString,
  init,
  startTimer,
  toggleTimer,
  updateToggleTime,
  updateProgressBar,
  soundAlarm,
  enableBrowserNotifications
};
