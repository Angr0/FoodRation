import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    user: storeReducer,
  },
});
