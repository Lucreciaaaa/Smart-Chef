import { Recipe } from "../types/recipe";

export function matchRecipes(
  recipes: Recipe[],
  userIngredientsInputs: string[] = [],
) {
  const scored = recipes.map((recipe) => {
    // normalize recipe ingredients
    const recipeIngs = (recipe.ingredients || [])
      .filter((i) => i?.name)
      .map((i) => i.name.toLowerCase());

    // match
    const usedIngredients = userIngredientsInputs.filter((userIng) => {
      const u = userIng.toLowerCase().trim();

      return recipeIngs.some((r) => {
        return r.includes(u) || u.includes(r);
      });
    });

    return {
      ...recipe,
      usedIngredients,
      score: usedIngredients.length,
    };
  });

  const finalRecipes = scored
    .filter((r) => r.score >= 2) // at least 2 ingredients matching
    .sort((a, b) => b.score - a.score);

  return finalRecipes;
}
