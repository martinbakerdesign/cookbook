export default function getFraction(str) {
  if (!str.includes(" ")) return str;
  str = str.trim();
  let whole = +str.split(/\\s| | |\\r|\\n/)[0];
  let numerator = +str.split(/\\s| | |\\r|\\n/)[1].split("/")[0];
  let denom = +str.split("/")[1];

  let fraction = `${(whole ? whole * denom : 0) + numerator}/${denom}`;

  return fraction;
}
