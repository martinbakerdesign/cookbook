import { cleanText } from "./parseUtils";
import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";
import blankRecipe from "./blankRecipe";

export default function useTemplate(dom, template) {
  const recipe = {
    ...blankRecipe
  }

  template.prepare && template.prepare(dom);

  // name
  const title = $(dom, getSelector(template.name))?.textContent.trim() ?? "";
  recipe.name = title;

  // duration
  recipe.duration = {
    quantity: 0,
    unit: null,
    text:
      $(dom, getSelector(template.duration))?.textContent.trim() ??
      "",
  };

  // amount
  recipe.amount = parseSingle(dom, template.amount);

  // ingredients
  recipe.ingredients = parseMany(dom, template.ingredients);
  
  // method
  recipe.method = parseMany(dom, template.method);

  // notes
  if (template.notes) {
    recipe.notes = parseMany(dom, template.notes);
  }

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
function getFirstOf (defs, dom) {
  for (const selector of defs) {
    const el = $(dom, getSelector(selector));
    if (el) return [el];
  }
  return null;
}
function parseSingle (dom, def) {
  return (def?.firstOf && def.firstOf.length > 0
    ? getFirstOf(def.firstOf, dom)[0]
    : $(dom, getSelector(def)))?.textContent.trim() ?? "";
}
function parseMany(dom, def) {
  let items = [];
  const containerSelector = getSelector(def);
  const containers = def?.firstOf && def.firstOf.length > 0
    ? getFirstOf(def.firstOf, dom)
    : containerSelector.includes(',')
      ? $$(dom, containerSelector)
      : [$(dom, containerSelector)];

    def.firstOf && console.log({containers});
  if (!containers) return items;

  if (def?.delimiter) {
    for (const container of containers) {
      const textContent = container.textContent.trim();
      const split = textContent.split(def.delimiter).map(str => cleanText(str.trim()));

      items = [...items, ...split];
    }

    return items
  }

  for (const container of containers) {
    const childSelector = def.contents.map((d) => getSelector(d)).join(", ");
    if (!container || !childSelector) continue;

    const children = $$(container, childSelector);
    if (!children || !children.length) continue;

    const childrenAsNodes = children
      .map((child) => {
        if (!child.textContent.trim().length) return null;
        let type = getType(child, def.contents);
        let text = cleanText(child.textContent).trim();
        return type != null
          ? {
              type,
              text,
            }
          : text;
      })
      .filter(v => null != v);

    items = [...items, ...childrenAsNodes]
  }


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
