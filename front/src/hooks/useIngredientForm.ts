// React
import { useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addIngredient, resetIngredients } from "../store/ingredientSlice";
import { resetRecipes } from "../store/recipeSlice";

// hooks
import { useRecipes } from "./useRecipes";

// constants
import { MIN_INPUT, MAX_INPUT, MAX_INGREDIENTS } from "../utils/constants";

function verifyInput(input: string) {
  const trimmed = input.trim();
  if (trimmed.length < MIN_INPUT) {
    return `Ingredient must be at least ${MIN_INPUT} characters`;
  }
  if (trimmed.length > MAX_INPUT) {
    return `Ingredient must be no more than ${MAX_INPUT} characters`;
  }
  const regex = /^[a-zA-Z\s]+$/;
  if (!regex.test(trimmed)) {
    return "Ingredient can only contain letters and spaces";
  }
  return "";
}

export const useIngredientForm = () => {
  const dispatch = useDispatch();
  const { searchRecipes } = useRecipes();
  const ingredientList = useSelector(
    (state: RootState) => state.ingredients.list,
  );

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setInput(value);
    if (error) {
      const validationError = verifyInput(value);
      setError(validationError);
    }
  };

  const handleAdd = () => {
    const validationError = verifyInput(input);
    if (ingredientList.length >= MAX_INGREDIENTS) return;

    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch(addIngredient(input.trim().toLowerCase()));
    setInput("");
    setError("");
  };

  const handleClearAll = () => {
    dispatch(resetIngredients());
    dispatch(resetRecipes());
  };

  return {
    input,
    error,
    ingredientList,
    handleChange,
    handleAdd,
    handleClearAll,
    handleSearch: searchRecipes,
  };
};
