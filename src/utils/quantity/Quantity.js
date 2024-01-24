import Fraction from "fraction.js";
import quantityTypes from "data/quantity/_types";
import numberToWord from "utils/text/numberToWord";
import wordToNumber from "utils/text/wordToNumber";

class Quantity {
  constructor({ value = 0, quantityType = null, scale = 1, shape = null } = {}) {
    this._value = 0;

    this.type = quantityType ?? this.getType(value);

    this._scale = scale;

    this.value = { value, quantityType: this.type };

    this.shape = shape ?? null;
  }
  get value() {
    let isRange = this.type === quantityTypes.range;
    switch (this.type) {
      default:
      case quantityTypes.number:
      case quantityTypes.string:
        return this._value * this._scale;
      case quantityTypes.fraction:
        return this._value.mul(this._scale).valueOf();
      case quantityTypes.range:
      case quantityTypes.deconstructed:
        return this._value.map((v, i) => (isRange || !i ? v.value : v._value));
    }
  }
  set value(input) {
    let value = input?.value ?? input;
    this.type = input?.quantityType ?? input?.type ?? this.getType(input);

    this._value =
      this.type === quantityTypes.range ||
      this.type === quantityTypes.deconstructed
        ? value.map(
            (v) =>
              new Quantity({
                ...(typeof v === "object" ? { ...v } : { value: v }),
                scale: this._scale,
              })
          )
        : this.type === quantityTypes.number
        ? +value
        : this.type === quantityTypes.fraction
        ? new Fraction(value)
        : wordToNumber(value); // word to number;
  }
  getType(value = this.value) {
    if (value == null) return null;
    if (Array.isArray(value)) return quantityTypes.range;
    if (typeof value === "number") return quantityTypes.number;
    if (
      value.toFraction != null ||
      (typeof value === "string" && value.includes("/"))
    )
      return quantityTypes.fraction;
    if (value.includes(" ")) return quantityTypes.deconstructed;
    if (!isNaN(+value)) return quantityTypes.number;
    return quantityTypes.string;
  }
  scale(fac = 1) {
    this._scale = fac;
    let isRange = this.type === quantityTypes.RANGE;

    if (
      [quantityTypes.RANGE, quantityTypes.DECONSTRUCTED].includes(this.type)
    ) {
      let i = 0;
      for (let val of this._value) {
        if (!isRange && i > 0) break;
        val.scale(fac);
        i++;
      }
    }
  }
  toString(joinStr = " ") {
    let value = this.value;

    switch (this.type) {
      default:
      case quantityTypes.string:
        return numberToWord(value);
      case quantityTypes.number:
        return value.toString();
      case quantityTypes.deconstructed:
        return this._value.map((v) => v.toString()).join(joinStr);
      case quantityTypes.fraction:
        return new Fraction(value).toFraction(true);
      case quantityTypes.range:
        return this._value.map((v) => v.toString()).join(joinStr);
    }
  }
}

export default Quantity;
