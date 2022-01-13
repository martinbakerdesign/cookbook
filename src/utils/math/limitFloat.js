export default function limitFloat(float, max = 1, step = 0) {
  return (!step ? float : Math.round(float * step) / step).toFixed(max);
}
