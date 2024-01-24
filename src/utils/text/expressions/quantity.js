const quantity =
  "(?<quantity>(?<range>(?:\\d+\\.\\d+|\\d+\\s+?\\d+/\\d+|\\d+)(?: to |\\s?-\\s?)(?:\\d+\\.\\d+|\\d+\\s+?\\d+/\\d+|\\d+))|(?<decimal>\\d+\\.\\d+)|(?<fraction>(?:\\d+\\s+)?\\d+/\\d+)|(?<digit>\\d+))";

export default quantity;
