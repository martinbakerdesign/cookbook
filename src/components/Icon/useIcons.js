import iconDefs from "./iconDefs";

const xmlns = "http://www.w3.org/2000/svg";

export default function useIcons() {
  if (document.querySelector("#icon-defs")) {
    [...document.querySelectorAll("#icon-defs")].forEach((d) => d.remove());
  }
  let defDump = document.createElementNS(xmlns, "svg");
  defDump.id = "icon-defs";
  defDump.setAttributeNS(null, "width", "1");
  defDump.setAttributeNS(null, "height", "1");
  defDump.setAttribute("hidden", "true");
  defDump.setAttribute("aria-hidden", "true");
  defDump.style.visibility = "hidden";
  defDump.style.userSelect = "none";
  defDump.style.pointerEvents = "none";
  defDump.style.position = "absolute";

  let symbol, paths, size, path;
  for (let def in iconDefs) {
    paths = iconDefs[def];
    size = def.split("--").pop();
    symbol = document.createElementNS(xmlns, "symbol");
    symbol.id = `icon--${def}`;
    symbol.setAttributeNS(null, "viewBox", `0 0 ${size} ${size}`);
    for (let d of paths) {
      path = document.createElementNS(xmlns, "path");
      path.setAttributeNS(null, "d", d);
      symbol.appendChild(path);
    }
    defDump.appendChild(symbol);
  }

  document.body.prepend(defDump);
}
