// components
import { Box, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// hooks
import { useRecipes } from "../../../hooks/useRecipes";

import { MAX_RECIPES } from "../../../utils/constants";

export default function RecipesContainer() {
  const { loading } = useRecipes();

  const { filtered, hasSearched } = useSelector(
    (state: RootState) => state.recipes
  );

  if (loading) {
    return <Typography>Loading…</Typography>;
  }
  if (!hasSearched) {
    return null;
  }

  if (filtered.length === 0) {
    return <Typography>No recipes found.</Typography>;
  }
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {filtered.slice(0, MAX_RECIPES).map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Box>
  );
}
