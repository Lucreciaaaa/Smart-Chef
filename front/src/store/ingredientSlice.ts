import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IngredientsState = {
  list: string[];
};

const initialState: IngredientsState = {
  list: ["chip 1", "chip2"], // initial values to test
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item !== action.payload);
    },
  },
});

export const { addIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
