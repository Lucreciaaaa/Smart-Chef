// components
import { Box, CircularProgress, Typography } from "@mui/material";
import RecipeCard from "./card/RecipeCard";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// hooks
import { useState } from "react"; // (react)
import { useRecipes } from "../../hooks/useRecipes";

import { MAX_RECIPES } from "../../utils/constants";
import logo from "../../assets/logo.png";

import { blue } from "@mui/material/colors";
import RecipeDialog from "./details/RecipeDialog";
import { ScoredRecipe } from "../../types/recipe";

const CenterBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      textAlign: "center",
      gap: 2,
    }}
  >
    {children}
  </Box>
);

export default function RecipesContainer() {
  const { loading } = useRecipes();
  const { filtered, hasSearched } = useSelector(
    (state: RootState) => state.recipes,
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<ScoredRecipe | null>(
    null,
  );

  const handleSelectRecipe = (recipe: ScoredRecipe) => {
    setSelectedRecipe(recipe);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  // Initial State
  if (!hasSearched) {
    return (
      <CenterBox>
        <Box
          component="img"
          src={logo}
          alt="SmartChef"
          color={blue}
          sx={{
            width: { xs: 150, sm: 250 },
            height: "auto",
            opacity: 0.15,
            filter: "invert(1) brightness(0.5)",
          }}
        />
        <Typography
          variant="h5"
          sx={{ color: "text.disabled", fontWeight: 500 }}
        >
          Find your next meal
        </Typography>
      </CenterBox>
    );
  }

  // Loading State
  if (loading) {
    return (
      <CenterBox>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Cooking your recipes...
        </Typography>
      </CenterBox>
    );
  }

  // No results
  if (filtered.length === 0) {
    return (
      <CenterBox>
        <Typography variant="h6" color="error">
          No recipes found...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try removing some ingredients or check your spelling.
        </Typography>
      </CenterBox>
    );
  }

  // Success
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        mt: 2,
      }}
    >
      {filtered.slice(0, MAX_RECIPES).map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelectRecipe={() => handleSelectRecipe(recipe)}
        />
      ))}

      <RecipeDialog
        open={openModal}
        onClose={handleCloseModal}
        selectedRecipe={selectedRecipe}
      />
    </Box>
  );
}
