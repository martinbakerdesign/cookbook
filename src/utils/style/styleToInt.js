export default function styleToInt(style) {
  let val = parseInt(style);
  let factor = style.includes("rem") ? 16 : 1;

  return val * factor;
}
