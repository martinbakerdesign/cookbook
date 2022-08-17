import seriouseatsTemplate from "./seriouseats";
import thespruceeatsTemplate from "./thespruceeats";
import nytimesTemplate from "./nytimes";
import sbsTemplate from "./sbs";
import allrecipesTemplate from "./allrecipes";
import foodnetworkTemplate from "./foodnetwork";
import epicuriousTemplate from "./epicurious";
import bonappetitTemplate from "./bonappetit";
import tastyTemplate from "./tasty";
import foodTemplate from "./food";

export const seriouseats = seriouseatsTemplate;
export const thespruceeats = thespruceeatsTemplate;
export const nytimes = nytimesTemplate;
export const sbs = sbsTemplate;
export const allrecipes = allrecipesTemplate;
export const foodnetwork = foodnetworkTemplate;
export const epicurious = epicuriousTemplate;
export const bonappetit = bonappetitTemplate;
export const tasty = tastyTemplate;
export const food = foodTemplate;

const templates = {
  seriouseats,
  thespruceeats,
  "cooking.nytimes": nytimes,
  sbs,
  allrecipes,
  foodnetwork,
  epicurious,
  bonappetit,
  tasty,
  food,
};

export default templates;
