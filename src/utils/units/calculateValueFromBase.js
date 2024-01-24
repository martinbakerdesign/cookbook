export default function calculateValueFromBase(value, instructions) {
  let isRange = Array.isArray(value);
  let sum = value;
  let operation, chunk;

  let adjusted = [...instructions].sort((a, b) => (Array.isArray(b) ? -1 : 0));

  for (let s = 0; s < adjusted.length; s++) {
    chunk = adjusted[s];
    if (typeof chunk === "string") {
      operation = adjusted[s];
    } else if (typeof chunk === "number") {
      if (operation === "+") {
        sum = isRange ? sum.map((v) => v - chunk) : sum - chunk;
      } else if (operation === "-") {
        sum = isRange ? sum.map((v) => v + chunk) : sum + chunk;
      } else if (operation === "*") {
        sum = isRange ? sum.map((v) => v / chunk) : sum / chunk;
      } else {
        sum = isRange ? sum.map((v) => v * chunk) : sum * chunk;
      }
    } else if (Array.isArray(chunk)) {
      let subchunk;
      for (let u = 0; u < chunk.length; u++) {
        subchunk = chunk[u];
        if (typeof subchunk === "string") {
          operation = subchunk;
        } else if (typeof subchunk === "number") {
          if (operation === "+") {
            sum = isRange ? sum.map((v) => v - subchunk) : sum - subchunk;
          } else if (operation === "-") {
            sum = isRange ? sum.map((v) => v + subchunk) : sum + subchunk;
          } else if (operation === "*") {
            sum = isRange ? sum.map((v) => v / subchunk) : sum / subchunk;
          } else {
            sum = isRange ? sum.map((v) => v * subchunk) : sum * subchunk;
          }
        }
      }
    }
  }

  return Array.isArray(sum) ? sum.map((v) => +v.toFixed(2)) : +sum.toFixed(2);
}
