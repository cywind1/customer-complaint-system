// https://redux-toolkit.js.org/api/configureStore
// A friendly abstraction over the standard Redux createStore function that adds good defaults to the store setup for a better development experience.
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// setupListeners ->  setting up a listener that can listen to changes in the network status, errors, and other lifecycle events of the API endpoints defined in a createApi function.
// track the state of the request, and then update the store with the results or error of the request when it has completed.
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // 13.1 changes on react-devtools
  devTools: false,
  //   devTools: true,
});

setupListeners(store.dispatch);
