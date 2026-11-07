export default function roundToQuarter(src: number): string {
  return (Math.round(src * 4) / 4).toFixed(2);
}
