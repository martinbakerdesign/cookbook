import { focusedWidget } from "components/Nav/Recipe";
import { isExpanded, WIDGETS } from "components/Nav/Recipe";
import {
  updateProgressBar,
  updateToggleTime,
  soundAlarm,
  enableBrowserNotifications,
  setDuration,
  dismissAlarm,
} from "components/Nav/Recipe/Timer";
import Timer from 'components/Nav/Recipe/Timer/Timer';
import { get } from "svelte/store";
import { milliseconds } from "types";
import useReducer from "utils/useReducer";

type TimerCallback = (ms?: milliseconds) => any;
const STATES = {
  DEFAULT: "DEFAULT",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  COMPLETE: "COMPLETE",
} as const;
const ACTIONS = {
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  RESTART: "RESTART",
  TOGGLE: "TOGGLE",
  COMPLETE: "COMPLETE",
  DISMISS: "DISMISS",
} as const;
type STATE = ObjectValues<typeof STATES>;
type ACTION = ObjectValues<typeof ACTIONS>;

const [state, dispatch] = useReducer(STATES.DEFAULT, ($state, action) => {
  switch (action) {
    case ACTIONS.PLAY:
      return STATES.RUNNING;
    case ACTIONS.PAUSE:
      return STATES.PAUSED;
    case ACTIONS.STOP:
      return STATES.DEFAULT;
    case ACTIONS.COMPLETE:
      return STATES.COMPLETE;
    case ACTIONS.RESTART:
      timer.restart();
      return STATES.RUNNING;
    case ACTIONS.DISMISS:
      return STATES.DEFAULT;
    default:
      return $state;
  }
});
const timer = new Timer(
  5 * 60 * 1000,
  {
    start: onStart,
    pause: onPause,
    resume: onResume,
    stop: onStop,
    progress: onProgress,
    complete: onComplete,
  }
);

function onStart() {
  console.log("onStart");

  enableBrowserNotifications();
  dispatch(ACTIONS.PLAY);
}
function onPause() {
  console.log("onPause");
  dispatch(ACTIONS.PAUSE);
}
function onResume() {
  console.log("onResume");
  dispatch(ACTIONS.PLAY);
}
function onStop() {
  console.trace("onStop");
  dispatch(ACTIONS.STOP);
}
function onProgress(elapsed) {
  updateToggleTime(elapsed);

  const progress = elapsed / timer.duration;
  updateProgressBar(progress);
}
function onComplete() {
  dispatch(ACTIONS.COMPLETE);
  soundAlarm();
}
function replaceTimer(timerDuration) {
  dismissAlarm();
  timer.stop();
  setDuration(timerDuration)
  timer.start();
  if (get(isExpanded)) return;
  focusedWidget.set(WIDGETS.TIMER);
}

const stop = timer.stop;
const restart = timer.restart;

export {
  timer as default,
  //
  STATES,
  ACTIONS,
  type STATE,
  type ACTION,
  type TimerCallback,
  //
  state,
  dispatch,
  //
  replaceTimer,
  stop,
  restart,
};
