import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setFilteredRecipes } from "../store/recipeSlice";
import { RootState } from "../store/store";

import { ScoredRecipe, Recipe } from "../types/recipe";

import { matchRecipes } from "../utils/matchRecipes";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const ingredientList = useSelector(
    (state: RootState) => state.ingredients.list,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3001/recipes");
        const data = await res.json();
        setRecipes(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const searchRecipes = useCallback(() => {
    const filtered: ScoredRecipe[] = matchRecipes(recipes, ingredientList);
    dispatch(setFilteredRecipes(filtered));
  }, [recipes, ingredientList, dispatch]);

  return { recipes, loading, searchRecipes };
}
