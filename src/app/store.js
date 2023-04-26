// https://redux-toolkit.js.org/api/configureStore
// A friendly abstraction over the standard Redux createStore function that adds good defaults to the store setup for a better development experience.
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
