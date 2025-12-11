import { Recipe } from "../types/recipe";

export function matchRecipes(
  recipes: Recipe[],
  userIngredientsInputs: string[] = [],
) {
  const scored = recipes.map((recipe) => {
    // normalize recipe ingredients
    const recipeIngs = (recipe.ingredients || [])
      .filter((i) => i?.name)
      .map((i) => i.name.toLowerCase().trim());

    // match
    const usedIngredients = userIngredientsInputs.filter((ing) =>
      recipeIngs.includes(ing),
    );

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
