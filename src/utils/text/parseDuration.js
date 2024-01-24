import time from "data/units/time";

const defaultDuration = {
  quantity: 0,
  unit: null,
};

export default function parseDuration(str) {
  if (!str || !str.length) return defaultDuration;

  let keys = Object.keys(time).sort((a, b) => (a.length < b.length ? 1 : -1));
  let regex = new RegExp(
    `(?<quantity>\\d+)\\s*(?<unit>${keys.join("|")})*s*\\b`,
    "gi"
  );

  let matches = regex.exec(str);

  let result = {
    quantity: parseFloat(matches?.groups?.quantity) ?? 0,
    unit: time[matches?.groups?.unit] ?? "",
  };

  return result;
}
