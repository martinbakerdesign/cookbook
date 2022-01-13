export default function timestampToDate(timestamp) {
  if (!timestamp) return null;
  let date = new Date(timestamp.seconds * 1000);

  return date;
}
