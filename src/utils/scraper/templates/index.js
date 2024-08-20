import seriouseats from "./seriouseats";
import thespruceeats from "./thespruceeats";
import nytimes from "./nytimes";
import sbs from "./sbs";
import allrecipes from "./allrecipes";
import foodnetwork from "./foodnetwork";
import epicurious from "./epicurious";
import bonappetit from "./bonappetit";
import tasty from "./tasty";
import food from "./food";
import wprm from "./wprm";
import generic from "./generic";

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
  generic,
  wprm
};

export {
  templates as default,
}
