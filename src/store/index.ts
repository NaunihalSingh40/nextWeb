import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { NextWebApi } from "services/NextWeb";
import cartReducer from "slices/cartSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Combine reducers
const rootReducer = combineReducers({
  [NextWebApi.reducerPath]: NextWebApi.reducer,
  cart: cartReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // persist only cart slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store config
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(NextWebApi.middleware),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
