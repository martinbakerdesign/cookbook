/**
 * @typedef {{
 *   id: string,
 *   name: string,
 * }} Recipe
 * @param {Recipe[]} recipes
 * @param {{key?: string, order?: 'ASC' | 'DESC'}|undefined} sortParams
 * @returns {Recipe[]} sorted recipes
 */

import removeEmojis from "utils/text/removeEmojis";

const keyMap = {
  'title': 'name',
  'date-created': 'created',
  'date-edited': 'last_edited',
}

export default function applySort(recipes, sortParams) {
  if (!sortParams || !sortParams?.key || !sortParams?.order) return recipes;
  
  const { key, order } = sortParams;
  const isASC = order === 'ASC'
  const recipeKey = keyMap[key]
  
  return recipes
  .filter((r) => r?.name != null)
  .sort((a, b) => {
    const aValue = prepareSortValue(a[recipeKey], recipeKey)
    const bValue = prepareSortValue(b[recipeKey], recipeKey)
      return aValue > bValue
        ? isASC ? 1 : -1
        : !isASC ? 1 : -1;
    });
}

function prepareSortValue (value, recipeKey) {
  switch (recipeKey) {
    case 'name':
      return removeEmojis(value);
    case 'created':
    case 'last_edited':
      return value.seconds;
    default:
      return value;
  }
}