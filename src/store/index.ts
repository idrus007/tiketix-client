import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice";

const store = configureStore({
  reducer: {
    cities: cityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
