import templates from "./templates";
import useTemplate from "./useTemplate";

const testSites = [
  "https://www.seriouseats.com/reverse-seared-pork-shoulder-chashu-recipe",
  "https://www.thespruceeats.com/smashed-brussels-sprouts-recipe-5203711",
  "https://cooking.nytimes.com/recipes/1023316-loaded-vegan-nachos",
];

// ("thespruceeats");

function getHostTemplate(url) {
  let sitename = new URL(url).host.replace("www.", "").split(".co")[0];

  return templates[sitename] ?? null;
}

// TODO Extract description, tags, notes
// TODO Autoconvert units to preferred

async function scrapeRecipe(url = "") {
  if (!url || !url.length) return null;

  let template = getHostTemplate(url);

  try {
    let pageMarkup = await getPage(url) ?? "";

    let shadow = document.createElement("div");
    shadow.innerHTML = pageMarkup;
    let recipe;

    if (template) {
      recipe = useTemplate(shadow, template);
    } else {
      recipe = {
        name: "",
        src: url,
        duration: "",
        amount: "",
        ingredients: [],
        method: [],
      };
    }

    recipe.src = url;

    console.log({ recipe });

    return recipe;
  } catch (err) {
    console.error(err);
  }
}

function getPage(url) {
  // let proxyUrl = "https://thingproxy.freeboard.io/fetch/";
  let proxyUrl = "https://creative-kataifi-668d50.netlify.app/.netlify/functions/fetch-website/";

  return fetch(proxyUrl + url, {})
    .then(async (r) => await r.text())
    .catch((err) => {
      console.error(err)
      return ""
    });
}

export default scrapeRecipe;
