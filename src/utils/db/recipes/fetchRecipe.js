import {
  loading,
  amount,
  duration,
  tags,
  ingredients,
  clearData,
  created,
  id,
  name,
  method,
  shared,
  author,
  mutationSource,
} from "store/";
import { INGREDIENT_TYPES } from "store/models/ingredients";
import parseIngredient from "utils/text/parseIngredient";
import time from "utils/units/time";
import getRecipeById from "./getById";

export default async function fetchRecipe(_id) {
  loading.set(true), clearData();
  try {
    if (!_id) throw "No ID passed to fetchRecipe";
    if (_id === "new") return;

    let recipe = await getRecipeById(_id);

    id.set(_id),
      created.set(recipe.created),
      name.set(recipe.name),
      amount.set(recipe.amount),
      duration.set({
        ...recipe.duration,
        unit: time[recipe.duration.unit] ?? null,
      }),
      tags.set(recipe.tags),
      ingredients.set(
        recipe.ingredients.map((i) =>
          i.type === INGREDIENT_TYPES.HEADER
            ? i
            : { ...i, ...parseIngredient(i) }
        )
      ),
      method.set(recipe.method ?? []),
      shared.set(recipe.shared ?? false),
      author.set(recipe.author ?? null),
      mutationSource.set("external"),
      loading.set(false);
  } catch (err) {
    throw err;
  }
}
