export default function capitalise(str = "") {
  if (!str.length) return str;
  let firstLetter = str.slice(0, 1);
  let rest = str.slice(1);
  return `${firstLetter.toUpperCase()}${rest}`;
}
