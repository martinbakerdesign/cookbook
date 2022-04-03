export default function timestampToDate(sortKey, created, last_edited) {
  let timestamp =
    sortKey === "created"
      ? created
      : sortKey === "last_edited"
      ? last_edited ?? created
      : last_edited ?? created;
  if (!timestamp) return null;
  let date = new Date(timestamp.seconds * 1000);

  return date;
}
