export default function timestampToDate(sortKey, created, last_edited) {
  let timestamp =
    sortKey === "date-created"
      ? created
      : sortKey === "date-edited"
      ? last_edited ?? created
      : last_edited ?? created;
  if (!timestamp) return null;
  let date = new Date(timestamp.seconds * 1000);

  return date;
}
