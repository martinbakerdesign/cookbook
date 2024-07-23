export const colorKeys = ['colors', 'color', 'borderColor', 'background', 'backgroundColor', 'fill', 'stroke', 'ringColor', 'textColor', 'accentColor', 'caretColor', 'divideColor', 'outlineColor', 'boxShadowColor', 'ringOffsetColor', 'placeholderColor', 'textDecorationColor'];
export const radiusKeys = ['radius']
export const spaceKeys = [
  "spacing",
  "padding",
  "gap",
  "rowGap",
  "columnGap",
  "top",
  "right",
  "bottom",
  "left",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "space"
];
export const textKeys = ["fontSize", "lineHeight", "letterSpacing", "fontWeight"];
export const numberKeys = [...radiusKeys, ...spaceKeys, ...textKeys];
export const compositeKeys = ['typography'];
export const allKeys = [...colorKeys, ...radiusKeys, ...spaceKeys, ...textKeys, ...numberKeys, ...compositeKeys];
export const inheritSpacingKeys = spaceKeys.filter((key) => key !== 'spacing');

const tailwindKeys = {
    color: colorKeys,
    radius: radiusKeys,
    space: spaceKeys,
    text: textKeys,
    number: numberKeys,
    all: allKeys,
    inheritSpacing: inheritSpacingKeys,
    composite: compositeKeys
}

export default tailwindKeys;