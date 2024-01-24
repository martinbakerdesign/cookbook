import Fraction from "fraction.js";
import pluralize from "pluralize";

const defaultAmount = {
  quantity: 1,
  unit: "",
};

export default function parseAmount(str = "") {
  if (!str || !str.length) return { ...defaultAmount, str, unit: str };
  let regex = new RegExp(
    `(?<quantity>(?<fraction>\\d+\/\\d+)|\\d+.\\d+|\\d+)*[ \-]*`
  );

  let matches = regex.exec(str);

  let quantity =
    matches.groups.fraction != null
      ? new Fraction(matches.groups.fraction).valueOf()
      : +matches.groups.quantity ?? 1;

  let result = {
    quantity,
    unit: pluralize(str.replace(regex, ""), 1, false),
    text: str,
  };

  return result;
}
