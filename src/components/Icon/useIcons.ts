import { defs } from ".";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

const xmlns = "http://www.w3.org/2000/svg";

type NSAttribute = [namespace: null | string, key: string, value: string];
type Attribute = [key: string, value?: string];
type Style = [key: string, value: string];

type NSAttributes = NSAttribute[];
type Attributes = Attribute[];
type Styles = Style[];

const nsAttributes = [
  [null, "width", "1"],
  [null, "height", "1"],
] as NSAttributes;
const attributes = [
  ["hidden", "true"],
  ["aria-hidden", "true"],
] as Attributes;
const styles = [
  ["visibility", "hidden"],
  ["userSelect", "none"],
  ["pointerEvents", "none"],
  ["position", "absolute"],
] as Styles;

type SVGProps = {
  styles?: Styles,
  attributes?: Attributes,
  nsAttributes?: NSAttributes,
}

export default function useIcons() {
  // Remove existing icon defs elements
  if ($("#icon-defs")) {
    $$("#icon-defs").forEach((d) => d.remove());
  }

  const iconSymbols = getSVG("icon-defs", { styles, attributes, nsAttributes });

  let symbol, paths;
  for (const def in defs) {
    paths = defs[def];
    if (!paths) continue;

    symbol = createSymbol(def, paths);
    iconSymbols.appendChild(symbol);
  }

  document.body.prepend(iconSymbols);
}

function getSVG(
  id: string|null,
  {
    styles = [],
    attributes = [],
    nsAttributes = [],
  }: SVGProps
) {
  const svg = document.createElementNS(xmlns, "svg");
  svg.id = id;

  for (const nsAttr of nsAttributes) {
    svg.setAttributeNS(...nsAttr);
  }
  for (const attr of attributes) {
    svg.setAttribute(...attr);
  }
  for (const [key, value] of styles) {
    svg.style[key] = value;
  }

  return svg;
}
function createSymbol(def, paths) {
  const viewBox = def.split("--").pop();
  const symbol = document.createElementNS(xmlns, "symbol");
  symbol.id = `icon--${def}`;
  symbol.setAttributeNS(null, "viewBox", `0 0 ${viewBox} ${viewBox}`);

  for (const d of paths) {
    const path = createPath(d);
    symbol.appendChild(path);
  }

  return symbol;
}
function createPath(d) {
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", d);
  return path;
}
