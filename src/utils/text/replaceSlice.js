export default function replaceSlice(src, start, end, inject) {
  let before = src.slice(0, start);
  let after = src.slice(end);
  return `${before}${inject}${after}`;
}
