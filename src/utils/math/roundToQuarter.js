export default function roundToQuarter(src) {
  return (Math.round(src * 4) / 4).toFixed(2);
}
