import {
  loading,
  amount,
  description,
  duration,
  tags,
  clearData,
  created,
  id,
  title,
  ingredients,
  miseEnPlace,
  method,
  notes,
  shared,
  author,
  src,
  mutationSource,
} from "store/";
import { INGREDIENT_TYPES } from "store/models/ingredients";
import parseIngredient from "utils/text/parseIngredient";
import time from "data/units/time";
import getRecipeById from "./getById";
import {  } from "store/index";

export default async function fetchRecipe(_id) {
  loading.set(true), clearData();
  try {
    if (!_id) throw "No ID passed to fetchRecipe";
    if (_id === "new") return;

    const recipe = await getRecipeById(_id);

    id.set(_id),
      created.set(recipe.created),
      title.set(recipe.name ?? ""),
      amount.set(recipe.amount),
      description.set(recipe.description ?? ""),
      duration.set({
        ...recipe.duration,
        unit: time[recipe.duration.unit] ?? null,
      }),
      tags.set(recipe.tags ?? []),
      ingredients.set(recipe.ingredients ?? []),
      miseEnPlace.set(recipe.mise_en_place ?? []),
      method.set(recipe.method ?? []),
      notes.set(recipe.notes ?? []),
      shared.set(recipe.shared ?? false),
      author.set(recipe.author ?? null),
      src.set(recipe.src ?? ""),
      mutationSource.set("external"),
      loading.set(false);
  } catch (err) {
    throw err;
  }
}

const types = {
  INGREDIENT: "INGREDIENT",
  HEADER: "HEADER",
  STEP: "STEP",
};
