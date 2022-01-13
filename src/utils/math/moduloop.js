export default function moduloop(value, min, max) {
  if (min == null || max == null) return value;

  let range = Math.abs(max - min) + 1;

  return value === max || value === min || (value > min && value < max)
    ? value
    : value > max
    ? min + ((value - min) % range)
    : max + 1 - (Math.abs(value) % range);
}
