import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/baseApi";
import ApiSlice from "./features/apiSlice";
// import { baseApi } from "./features/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, ApiSlice.middleware),
});
