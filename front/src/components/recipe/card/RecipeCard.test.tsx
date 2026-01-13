import { createTheme, ThemeProvider } from "@mui/material";
import { ScoredRecipe } from "../../../types/recipe";
import RecipeCard from "./RecipeCard";
import { render, screen } from "@testing-library/react";

const fakeRecipe: ScoredRecipe = {
  id: "1",
  title: "Test Recipe",
  ingredients: [],
  usedIngredients: ["oil", "gas"],
  steps: [],
  matchIngredientsCount: 2,
  relevantInputCount: 2,
  normalizedMatchScore: 60,
  servings: 2,
  cookingTime: 30,
  image: "",
};

const theme = createTheme();

test("renders RecipeCard without crashing", () => {
  render(
    <ThemeProvider theme={theme}>
      <RecipeCard recipe={fakeRecipe} onSelectRecipe={() => {}} />
    </ThemeProvider>,
  );
  const recipeTitle = screen.getByText("Test Recipe");
  expect(recipeTitle).toBeInTheDocument();
});
