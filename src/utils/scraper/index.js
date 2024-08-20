import templates from "./templates";
import useTemplate from "./useTemplate";
import $ from 'utils/dom/querySelector'
import blankRecipe from "./blankRecipe";

const testSites = [
  "https://www.seriouseats.com/reverse-seared-pork-shoulder-chashu-recipe",
  "https://www.thespruceeats.com/smashed-brussels-sprouts-recipe-5203711",
  "https://cooking.nytimes.com/recipes/1023316-loaded-vegan-nachos",
];

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
    const pageMarkup = await getPage(url);
    
    const shadow = document.createElement("div");
    shadow.innerHTML = pageMarkup;
    const isWPRM = null != $(shadow, '.wprm-recipe');
    let recipe = {...blankRecipe};

    if (template) {
      recipe = useTemplate(shadow, template);
    } else if (isWPRM) {
      recipe = useTemplate(shadow, templates.wprm)
    } else {
      recipe = templates.generic(shadow)
    }

    recipe.src = url;

    console.log('recipe scraped: ',{ recipe });

    return recipe;
  } catch (err) {
    console.error(err);
  }
}

async function getPage(url) {
  const proxyUrl = "https://creative-kataifi-668d50.netlify.app/.netlify/functions/fetch-website/";

  try {
    const req = await fetch(proxyUrl + url, {})
    const text = await req.text();
    if (!req.ok) throw text;
    
    return text;
  } catch (err) {
    throw err;
  }
}

export default scrapeRecipe;
