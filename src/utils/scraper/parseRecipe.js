import $ from "utils/dom/querySelector";
import $$ from "utils/dom/querySelectorAll";

function applyTransformations(src, transformations = []) {
  if (!transformations.length || !src || !src.length) return src;

  let output = src;

  for (let t of transformations) {
    output = t(output);
  }
  return output;
}
function replaceSteps(src) {
  return src.replace(/step \d+/gi, "");
}
function replaceDoubleSpaces(src) {
  return src.replace(/\s+/g, " ");
}
function replaceFractionSymbols(src) {
  return src
    .replace(/½/g, "1/2")
    .replace(/⅓/g, "1/3")
    .replace(/⅕/g, "1/5")
    .replace(/⅙/g, "1/6")
    .replace(/⅛/g, "1/8")
    .replace(/⅔/g, "2/3")
    .replace(/⅖/g, "2/5")
    .replace(/⅚/g, "5/6")
    .replace(/⅜/g, "3/8")
    .replace(/¾/g, "3/4")
    .replace(/⅗/g, "3/5")
    .replace(/⅝/g, "5/8")
    .replace(/⅞/g, "7/8")
    .replace(/⅘/g, "4/5")
    .replace(/¼/g, "1/4")
    .replace(/⅐/g, "1/7")
    .replace(/⅑/g, "1/9")
    .replace(/⅒/g, "1/10")
    .replace(/↉/g, "0/3");
}
function replaceDegrees(src) {
  return src
    .replace(/ degrees Celsius/gi, "°C")
    .replace(/ degrees C/gi, "°C")
    .replace(/ degrees Fahrenheit/gi, "°F")
    .replace(/ degrees F/gi, "°F");
}
function replaceIllegalChars(src) {
  return src.replace(
    /[^0-9a-zA-Z:, \°\&\(\)\.\;\:\'\"\?\/\{\}\[\]\+\=-\_*&^%$#@!~`]+/,
    ""
  );
}
function replaceNewLines(src) {
  return src.replace(/\n+\s+/g, " ");
}

function allDescendants(node, addFn) {
  let isHeader;
  for (const child of node.children) {
    if ($(child, "a")) {
      for (const a of child.getElementsByTagName("a")) {
        a.parentElement.innerHTML = a.parentElement.textContent;
      }
    }
    if ($(child, "span")) {
      for (const a of child.getElementsByTagName("span")) {
        a.parentElement.innerHTML = a.parentElement.textContent;
      }
    }
    isHeader =
      child.tagName === "H2" ||
      child.tagName === "H3" ||
      child.tagName === "H4" ||
      child.tagName === "H5";
    child.children.length
      ? allDescendants(child, addFn)
      : cleanText(child.textContent).length &&
        addFn({
          isHeader,
          text: cleanText(child.textContent),
        });
  }
}
function cleanText(text) {
  return applyTransformations(text, [
    replaceFractionSymbols,
    replaceDegrees,
    replaceIllegalChars,
    replaceNewLines,
    replaceDoubleSpaces,
  ]).trim();
}

function parseRecipe() {
  function addIngredient({ isHeader, text }) {
    (content = text.trim()),
      content.length && ingredients.push({ isHeader, text: content });
  }
  function addMethod({ isHeader, text }) {
    (content = replaceDegrees(text)
      .replace(/step \d+/gi, "")
      .trim()),
      content.length && method.push({ isHeader, text: content });
  }
  let article =
    $("h1").closest("article") ??
    $("h1").closest("main") ??
    document.body;

  let shadowArticle = document.createElement("div");
  shadowArticle.innerHTML = article.innerHTML;
  let images = $$(shadowArticle, "img")
    .map((el) => el.src)
    .filter((src) => src.trim().length);
  let videos = $$(shadowArticle, 'video, iframe')
    .map((el) =>
      el.tagName === "video" ? el.src : el.src.includes("youtu") ? el.src : null
    )
    .filter((v) => v != null);
  $$(shadowArticle, "figure, img, input, video, button, svg")
    .forEach((el) => el.remove());

  for (const el of shadowArticle.getElementsByTagName("script")) {
    el.remove();
  }
  for (const el of shadowArticle.getElementsByTagName("span")) {
    el.parentElement.innerHTML = el.parentElement.textContent;
  }
  for (const el of shadowArticle.getElementsByTagName("strong")) {
    el.parentElement.innerHTML = el.parentElement.textContent;
  }
  for (const el of shadowArticle.getElementsByTagName("em")) {
    el.parentElement.innerHTML = el.parentElement.textContent;
  }
  for (const el of shadowArticle.getElementsByTagName("b")) {
    el.parentElement.innerHTML = el.parentElement.textContent;
  }
  for (const el of shadowArticle.getElementsByTagName("u")) {
    el.parentElement.innerHTML = el.parentElement.textContent;
  }
  $$(shadowArticle, '*').forEach(
    (n) => window.getComputedStyle(n).display === "none" && console.log(n)
  );
  $$(shadowArticle, '*').forEach(
    (n) =>
      (!cleanText(n.textContent).length ||
        window.getComputedStyle(n).display === "none") &&
      n.remove()
  );

  let title =
    $(article, "h1")?.textContent ??
    $("h1")?.textContent ??
    document.title;
  title = title.replace(/recipe/i, "").trim();
  let dom = {
    headings: $$(shadowArticle, "h2, h3, h4, h5, [role='heading']"),
    lists: $$(
      shadowArticle,
        'ol, ul, dl, [class*="ingredients" i], [class*="list" i], [class*="instruction" i], [class*="step" i], [class*="method" i]',
      )
    .filter((l) => l.children.length),
  };

  let ingredients = [],
    method = [];
  let headings = {
    ingredients: null,
    method: null,
  };
  let text, parent, content, closestSection;

  for (let h of dom.headings) {
    text = h.textContent.toLowerCase().trim();
    // Ingredients
    if (text.includes("ingredients") && !headings.ingredients) {
      headings.ingredients = h;
      parent = h;
      closestSection = h.closest("section");
      let grandParent = closestSection;
      if (!closestSection) {
        let isDiff = false;
        let parentText, grandParentText;
        while (!isDiff) {
          grandParent = parent.parentElement;
          parentText = cleanText(parent.textContent);
          grandParentText = cleanText(grandParent.textContent);
          isDiff = grandParentText !== parentText;
          if (!isDiff) {
            parent = grandParent;
          }
        }
      }

      h.remove();

      allDescendants(grandParent, addIngredient);
    }
    // Method
    else if (
      (text.startsWith("method") ||
        text.startsWith("directions") ||
        text.startsWith("instructions") ||
        text.startsWith("preparation") ||
        text.startsWith("directions") ||
        text.startsWith("steps")) &&
      !headings.method
    ) {
      headings.method = h;
      parent = h;
      closestSection = h.closest("section");
      let grandParent = closestSection;
      if (!closestSection) {
        let isDiff = false;
        let parentText, grandParentText;
        while (!isDiff) {
          grandParent = parent.parentElement;
          parentText = cleanText(parent.textContent);
          grandParentText = cleanText(grandParent.textContent);
          isDiff = grandParentText !== parentText;
          if (!isDiff) {
            parent = grandParent;
          }
        }
      }

      h.remove();

      allDescendants(grandParent, addMethod);
    }
  }

  return { title, images, videos, ingredients, method };
}

const parsers = {
  seriousEats() {
    const title = $(".heading__title").textContent;
    const description =
      $(".heading__subtitle").textContent;
    const ingredients = $(".structured-ingredients")
      ? $$(
            ".structured-ingredients .structured-ingredients__list-heading, .structured-ingredients .structured-ingredients__list-item"
          ).map((el) => ({
          type: el.className.includes("heading") ? "header" : "ingredient",
          text: parseIngredient(el.textContent),
        }))
      : $$(".ingredient-list li").map(
          (el) => ({
            type: "ingredient",
            text: parseIngredient(el.textContent),
          })
        );
    const method = $$(".mntl-sc-block-group--OL li")
      .map((el) =>
        $(el, "strong")
          ? [
              {
                type: "header",
                text: parseMethod(
                  $(el, "strong").textContent.replace(":", "")
                ),
              },
              {
                type: "step",
                text: parseMethod(
                  $(el, "strong").nextSibling.textContent
                ),
              },
            ]
          : { type: "step", text: parseMethod(el.textContent) }
      )
      .flat();
    const images = $$("#article--structured-project_1-0 img")
      .map((img) => img.src)
      ?.filter((src) => src.length);
    const videos = $$(".inline-video video")
      .map((vid) => vid.src)
      ?.filter((src) => src.length);
    const notes = $$("h2")
      .filter(
        (el) =>
          el.textContent.trim() === "Notes" ||
          el.textContent.trim() === "Make-Ahead and Storage"
      )
      .map((el) => cleanText(el.nextElementSibling.textContent)) ?? [];
    const equipment = $$("h2")
      .filter((el) => el.textContent.trim() === "Special equipment")
      .map((el) => cleanText(el.nextElementSibling.textContent))[0]
      ?.split(",")
      ?.map((str) => str.trim()) ?? [];

    const tags = $$('.tag-nav__list li').map((el) => replaceNewLines(el.textContent).trim())

    return {
      title,
      images,
      videos,
      description,
      ingredients,
      method,
      notes,
      equipment,
      tags
    };
  },
};

function parseIngredient(src) {
  return applyTransformations(src, [
    replaceFractionSymbols,
    replaceIllegalChars,
    replaceNewLines,
    replaceDoubleSpaces,
  ]).trim();
}
function parseMethod(src) {
  return applyTransformations(src, [
    replaceFractionSymbols,
    replaceDegrees,
    replaceSteps,
    replaceIllegalChars,
    replaceNewLines,
    replaceDoubleSpaces,
  ]).trim();
}

function findContainer () {
  
}
function findChildren () {

}

console.log(parsers.seriousEats());
