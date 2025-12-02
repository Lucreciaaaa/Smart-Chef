import { useEffect, useState } from "react";
import { Recipe } from "../types/recipe";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { recipes, loading };
}
