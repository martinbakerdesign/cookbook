export default function calculateValueToBase(value, instructions) {
  let sum = value;
  let isRange = Array.isArray(value);
  let operation, chunk;
  for (let s = 0; s < instructions.length; s++) {
    chunk = instructions[s];
    if (typeof chunk === "string") {
      operation = instructions[s];
    } else if (typeof chunk === "number") {
      if (operation === "+") {
        sum = isRange ? sum.map((v) => v + chunk) : sum + chunk;
      } else if (operation === "-") {
        sum = isRange ? sum.map((v) => v - chunk) : sum - chunk;
      } else if (operation === "*") {
        sum = isRange ? sum.map((v) => v * chunk) : sum * chunk;
      } else {
        sum = isRange ? sum.map((v) => v / chunk) : sum / chunk;
      }
    } else if (Array.isArray(chunk)) {
      let subchunk;
      for (let u = 0; u < chunk.length; u++) {
        subchunk = chunk[u];
        if (typeof subchunk === "string") {
          operation = subchunk;
        } else if (typeof subchunk === "number") {
          if (operation === "+") {
            sum = isRange ? sum.map((v) => v + subchunk) : sum + subchunk;
          } else if (operation === "-") {
            sum = isRange ? sum.map((v) => v - subchunk) : sum - subchunk;
          } else if (operation === "*") {
            sum = isRange ? sum.map((v) => v * subchunk) : sum * subchunk;
          } else {
            sum = isRange ? sum.map((v) => v / subchunk) : sum / subchunk;
          }
        }
      }
    }
  }

  return sum;
}
