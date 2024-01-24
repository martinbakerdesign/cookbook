import icon from "./icon";

export default function simpleButton(id, className, label, iconDef) {
  let button = document.createElement("button");
  button.type = "button";
  id && (button.id = id);
  className && (button.className = className);
  label && button.setAttribute("aria-label", label);

  if (iconDef) button.appendChild(icon(iconDef));

  return button;
}
