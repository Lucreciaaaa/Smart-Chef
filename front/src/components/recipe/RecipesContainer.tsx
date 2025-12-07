import { Box } from "@mui/material";
import { useRecipes } from "../../hooks/useRecipes";
import RecipeCard from "./RecipeCard";

export default function RecipesContainer() {
  const { recipes, loading } = useRecipes();

  // TODO : replace by MUI components
  if (loading) return <p>Loading…</p>;
  if (!recipes.length) return <p>No recipes found.</p>;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {recipes.slice(0, 10).map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  );
}
