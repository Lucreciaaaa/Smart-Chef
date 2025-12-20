import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../types/recipe";

type RecipeState = {
  filtered: Recipe[];
  hasSearched: boolean;
};

const initialState: RecipeState = {
  filtered: [],
  hasSearched: false,
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setFilteredRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.filtered = action.payload;
      state.hasSearched = true;
    },
    resetRecipes: (state) => {
      state.filtered = [];
      state.hasSearched = false;
    },
  },
});

export const { setFilteredRecipes, resetRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
