export default function roundToFraction(src: number, denom = 1): string {
  return (Math.round(src * denom) / denom).toFixed(2);
}
