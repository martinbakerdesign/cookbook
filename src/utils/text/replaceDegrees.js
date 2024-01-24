export default function replaceDegrees(src) {
  return src
    .replace(/degrees Celsius/gi, "°C")
    .replace(/degrees C/gi, "°C")
    .replace(/degrees Fahrenheit/gi, "°F")
    .replace(/degrees F/gi, "°F");
}
