import quantityTypes from "data/quantity/_types";
import units from "data/units";
import calculateValueToBase from "utils/units/calculateValueToBase";
import calculateValueFromBase from "utils/units/calculateValueFromBase";
import Quantity from "utils/quantity/Quantity";
import { UNIT_TEMPERATURE, UNIT_TIME } from "data/units/_types";

class QuantityDeco {
  constructor({
    text = "",
    value = null,
    unit = null,
    pos = 0,
    size = 0,
    quantityType = null,
    quantityPos = 0,
    quantitySize = 0,
    quantityText = "",
    unitPos = 0,
    unitSize = 0,
    unitText = "",
    unitType = "",
    rangePos = [],
    rangeSizes = [],
    scale = 1,
  } = {}) {
    this.text = text;
    this.pos = pos;
    this.size = size;
    this.end = pos + size;
    this.unit = unit;
    this.quantityPos = quantityPos ?? 0;
    this.quantitySize = quantitySize;
    this.quantityText = quantityText;
    this.rangePos = rangePos;
    this.rangeSizes = rangeSizes;
    this.unitPos = unitPos;
    this.unitSize = unitSize;
    this.unitText = unitText;
    this.unitType = unitType;
    this.quantity = new Quantity({ value, quantityType, scale });
    this.joiningStr = this.getJoiningStr(this.quantity);
    this.scalable = unit && units[unit]
      ? ![UNIT_TEMPERATURE, UNIT_TIME].includes(units[unit].type)
      : true;
  }
  scale(factor) {
    this.scalable && this.quantity.scale(factor);
    return this.toString(this.scalable ? factor : 1);
  }
  convert(toUnit = null) {
    let fromUnit = units[this.unit];

    let originalText = this.text;
    let quantityType = this.quantity.type;
    let scale = this.quantity._scale;
    let isRange = quantityType === quantityTypes.RANGE;
    let isDeconstructed = quantityType === quantityTypes.DECONSTRUCTED;

    let sum = !isDeconstructed ? this.quantity.value : this.quantity.value[1];

    let toBase = calculateValueToBase(sum, fromUnit.base);
    let convertedValue = calculateValueFromBase(toBase, toUnit.base);

    // update instance with new quantity
    let convertedQuantity = new Quantity({
      value: !isDeconstructed
        ? convertedValue
        : this.quantity.value.map((v, i) => (i ? convertedValue : v)),
      quantityType,
      scale,
    });
    
    let useAbbrev = toUnit.type === UNIT_TEMPERATURE;
    let pluraliseUnit = isRange ? true : convertedValue !== 1;
    
    // generate new text string
    let newUnitText = useAbbrev
      ? toUnit.abbrev[0]
      : toUnit[pluraliseUnit && toUnit.plural ? "plural" : "title"];
    !pluraliseUnit && !useAbbrev && (newUnitText = newUnitText.toLowerCase());
    let newText = originalText
      // replace quantity
      .replace(this.quantityText, convertedQuantity.toString(this.joiningStr))
      // replace unit
      .replace(this.unitText, newUnitText);

    return { text: newText, quantity: convertedQuantity };
  }
  getJoiningStr(quantity) {
    return [quantityTypes.DECONSTRUCTED, quantityTypes.RANGE].includes(
      quantity.type
    )
      ? this.text.slice(this.rangePos[0] + this.rangeSizes[0], this.rangePos[1])
      : "";
  }
  toString(scale = 1) {
    if (!this.scalable || scale === 1) return this.text;
    this.quantity.scale(scale);

    let start = this.quantityPos ?? this.pos;
    let end = start + this.quantitySize;
    let replaceStr = this.quantity.toString(this.joiningStr);

    this.quantity.scale(1);

    return this.text.slice(0, start) + replaceStr + this.text.slice(end);
    // .replace(/\s/g, "&nbsp;");
  }
}

export default QuantityDeco;
