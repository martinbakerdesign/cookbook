import { localStorage } from "store/

export default async function autosave(recipe) {
  try {
    // Save in local
    saveToLocal(recipe);

    // Save in cloud
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// User saves
// Store latest version in localstorage

function saveToLocal(recipe) {
  let recipes = JSON.parse(localStorage.get("recipes"));

  if (recipes.find((r) => r.id === recipe.id)) {
    recipes = recipes.map((r) => (r.id === recipe.id ? recipe : r));
  } else {
    recipes = [...recipes, recipe];
  }

  localStorage.set("recipes", recipes);
}
