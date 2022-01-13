import { UNIT_TIME } from "./types";

export const s = {
  title: "Second",
  type: UNIT_TIME,
  abbrev: ["sec", "s"],
  base: ["*", 1],
};
export const min = {
  title: "Minute",
  type: UNIT_TIME,
  abbrev: ["min", "m"],
  base: ["*", 60],
};
export const h = {
  title: "Hour",
  type: UNIT_TIME,
  abbrev: ["hr", "h"],
  base: ["*", 3600],
};
export const d = {
  title: "Day",
  type: UNIT_TIME,
  abbrev: ["dy", "d"],
  base: ["*", 86400],
};
export const week = {
  title: "Week",
  type: UNIT_TIME,
  abbrev: ["wk", "w"],
  base: ["*", 604800],
};
export const mo = {
  title: "Month",
  type: UNIT_TIME,
  abbrev: ["mnth", "mon", "mo", "m"],
  base: ["*", 2592000],
};

export const timeArr = [s, min, h, d, week, mo];

const time = {};

timeArr.forEach((unit) => {
  let { title, abbrev } = unit;
  for (let a = 0; a < abbrev.length + 1; a++) {
    time[a === 0 ? title.toLowerCase() : abbrev[a - 1]] = unit;
  }
});

export default time;
