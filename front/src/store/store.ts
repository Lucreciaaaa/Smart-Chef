import { configureStore, combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import ingredientReducer from "./ingredientSlice";
import recipeReducer from "./recipeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ingredients", "recipes"],
};

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  recipes: recipeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Redux types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
