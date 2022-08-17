import parseAmount from "utils/text/parseAmount";
import parseDuration from "utils/text/parseDuration";
import { cleanText } from "./parseUtils";

export default function useTemplate(dom, template) {
  let recipe = {
    name: "",
    duration: {
      text: "",
      quantity: 0,
      unit: null,
    },
    amount: "",
    ingredients: [],
    method: [],
  };

  template.prepare && template.prepare(dom);

  // name
  recipe.name =
    dom.querySelector(getSelector(template.name))?.textContent.trim() ?? "";
  // duration
  recipe.duration = {
    quantity: 0,
    unit: null,
    text:
      dom.querySelector(getSelector(template.duration))?.textContent.trim() ??
      "",
  };
  // amount
  recipe.amount =
    dom.querySelector(getSelector(template.amount))?.textContent.trim() ?? "";
  // ingredients
  recipe.ingredients = parseMany(dom, template.ingredients);
  // method
  recipe.method = parseMany(dom, template.method);

  template.tags && (recipe.tags = parseMany(dom, template.tags));

  template.transformations && template.transformations(recipe);

  return recipe;
}

function getSelector(def) {
  if (!def) return console.error(def);
  return (
    def.selector ??
    `${def.tag ?? ""}${def.id ? `#${def.id}` : ""}${
      def.className ? `${["", ...def.className.split(" ")].join(".")}` : ""
    }`
  );
}
function parseMany(dom, def) {
  let container = dom.querySelector(getSelector(def));
  if (!container) return [];
  let childSelector = def.contents.map((d) => getSelector(d)).join(", ");
  let children = [...container.querySelectorAll(childSelector)];
  let items = children.map((child) => {
    let type = getType(child, def.contents);
    let text = cleanText(child.textContent).trim();
    return type != null
      ? {
          type,
          text,
        }
      : text;
  });

  return items;
}
function getType(el, defs) {
  let type;
  for (let def of defs) {
    if (!el.matches(getSelector(def))) continue;
    type = def.type;
    break;
  }
  return type;
}