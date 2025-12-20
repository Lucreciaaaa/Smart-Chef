import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IngredientsState = {
  list: string[];
};

const initialState: IngredientsState = {
  list: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<string>) => {
      const newIngredient = action.payload;
      if (!state.list.includes(newIngredient)) {
        state.list.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (item) => item !== action.payload.toLowerCase(),
      );
    },
    resetIngredients: (state) => {
      state.list = [];
    },
  },
});

export const { addIngredient, removeIngredient, resetIngredients } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
