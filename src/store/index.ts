import { configureStore } from "@reduxjs/toolkit";
import { NextWebApi } from "services/NextWeb";

const store = configureStore({
  reducer: {
    [NextWebApi.reducerPath]: NextWebApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(NextWebApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
