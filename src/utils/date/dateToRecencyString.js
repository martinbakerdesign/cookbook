export default function dateToRecencyString(src) {
  if (!src) console.log(src);
  if (!src) return null;
  let now = Date.now();
  let timeSince = now - src;

  const seconds = timeSince < 60 * 1000;
  const minutes = timeSince < 60 * 60 * 1000;
  const hours = timeSince < 60 * 60 * 24 * 1000;
  const days = timeSince < 60 * 60 * 24 * 5 * 1000;

  let date = src.getDate();
  let month = src.getMonth();
  let year = src.getFullYear();

  if (seconds) {
    let secs = Math.round(timeSince / 1000);
    return secs < 10 ? "Just now" : `${secs} secs ago`;
  } else if (minutes) {
    let mins = Math.ceil(timeSince / (60 * 1000));
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  } else if (hours) {
    let hours = Math.ceil(timeSince / (60 * 60 * 1000));
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (days) {
    let dys = Math.ceil(timeSince / (24 * 60 * 60 * 1000));
    return `${dys} day${dys > 1 ? "s" : ""} ago`;
  }

  return `${date} ${monthNames[month].slice(0, 3)} ${year}`;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
