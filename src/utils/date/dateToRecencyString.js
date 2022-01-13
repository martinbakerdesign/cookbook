export default function dateToRecencyString(date) {
  if (!date) return null;
  let now = Date.now();
  let timeSince = now - date;

  const seconds = timeSince < 60 * 1000;
  const minutes = timeSince < 60 * 60 * 1000;
  const hours = timeSince < 60 * 60 * 24 * 1000;
  const days = timeSince < 60 * 60 * 24 * 5 * 1000;

  let _date = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

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

  return `${_date} ${monthNames[month].slice(0, 3)} ${year}`;
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
