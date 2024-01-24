import iconDefs from "components/Icon/iconDefs";

const namespace = "http://www.w3.org/2000/svg";

function icon(iconDef) {
  let viewBox = +iconDef.split("--")[1] ?? 20;
  let paths = iconDefs[iconDef] ?? [];
  let icon = document.createElementNS(namespace, "svg");
  icon.setAttribute("class", "icon");
  icon.setAttribute("viewBox", `0 0 ${viewBox} ${viewBox}`);
  icon.setAttribute("role", "presentation");
  icon.setAttribute("width", viewBox.toString());
  icon.setAttribute("height", viewBox.toString());

  let path;
  for (let d of paths) {
    path = document.createElementNS(namespace, "path");
    path.setAttribute("d", d);
    icon.appendChild(path);
  }
  return icon;
}

export default icon;
