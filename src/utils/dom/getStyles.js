/**
 * Utility function for getting specific dom element style property values
 * @param {*} el DOM Element to get style values from
 * @param {string[]} props Array of property key names to get values for
 * @returns
 */

export default function getStyles(el, props) {
  const computedStyles = getComputedStyle(el);

  const styles = props
    .map(
      (propName) =>
        `${propName}: ${computedStyles[getCamelPropName(propName)]};`
    )
    .join("");

  return styles;
}

function getCamelPropName(propName) {
  return propName
    .split("-")
    .map((s, i) => (!i ? s : s.slice(0, 1).toUpperCase() + s.slice(1)))
    .join("");
}
