import { UNIT_TIME } from "./_types";

// TODO change plural field to array

export const s = {
  title: "Second",
  type: UNIT_TIME,
  abbrev: ["secs", "sec", "s"],
  plural: "seconds",
  base: ["*", 1],
};
export const min = {
  title: "Minute",
  type: UNIT_TIME,
  abbrev: ["mins", "min", "m"],
  plural: "minutes",
  base: ["*", 60],
};
export const h = {
  title: "Hour",
  type: UNIT_TIME,
  abbrev: ["hrs", "hr", "h"],
  plural: "hours",
  base: ["*", 3600],
};
export const d = {
  title: "Day",
  type: UNIT_TIME,
  abbrev: ["dys", "dy", "d"],
  plural: "days",
  base: ["*", 86400],
};
export const week = {
  title: "Week",
  type: UNIT_TIME,
  abbrev: ["wks", "wk", "w"],
  plural: "weeks",
  base: ["*", 604800],
};
export const mo = {
  title: "Month",
  type: UNIT_TIME,
  abbrev: ["mnths", "mnth", "mons", "mon", "mo", "m"],
  plural: "months",
  base: ["*", 2592000],
};

export const timeArr = [s, min, h, d, week, mo];

const time = {};

timeArr.forEach((unit) => {
  const { title, abbrev, plural } = unit;

  time[title] = unit;
  abbrev.forEach((a) => {
    time[a] = unit;
  });
  time[plural] = unit;
});

export default time;
