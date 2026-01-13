import { render, screen } from "@testing-library/react";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import IngredientChip from "./IngredientChip";

import { createTheme, ThemeProvider } from "@mui/material";

// test reducer
const ingredientsReducer = (state = { list: ["tomato", "cheese"] }) => state;

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

const theme = createTheme();

test("renders IngredientChip without crashing", () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IngredientChip />
      </ThemeProvider>
    </Provider>,
  );
  const tomatoChip = screen.getByText("tomato");
  const cheeseChip = screen.getByText("cheese");

  expect(tomatoChip).toBeInTheDocument();
  expect(cheeseChip).toBeInTheDocument();
});
