export default function getRecipeByID (recipes: Recipe[], id: RecipeID): Recipe|null {
    return null != recipes ? recipes.find(r => id === (r?.id ?? null)) : null;
}