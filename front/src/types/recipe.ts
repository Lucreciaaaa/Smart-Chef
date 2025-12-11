export type Ingredient = {
  name: string;
  amount: string;
};

export type Recipe = {
  id: string;
  title: string;
  overview?: string;
  image: string;
  ingredients: Ingredient[];
  usedIngredients?: string[]; // those that matches the user input
  cookingTime?: number;
  servings?: number;
  steps: string[];
};

export interface ScoredRecipe extends Recipe {
  usedIngredients?: string[];
  score?: number;
}
