export default function roundToFraction(src, denom = 1) {
  return (Math.round(src * denom) / denom).toFixed(2);
}
