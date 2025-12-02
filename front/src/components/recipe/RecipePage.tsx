import { Box } from "@mui/material";
import { useRecipes } from "../../hooks/useRecipes";
import RecipeCard from "./RecipeCard";

export default function RecipesPage() {
  const { recipes, loading } = useRecipes();

  if (loading) return <p>Loading…</p>;
  if (!recipes.length) return <p>No recipes found.</p>;

  return (
    <Box>
      <RecipeCard recipe={recipes[0]} />
    </Box>
  );
}
