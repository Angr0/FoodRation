import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../src/localStorage.js";

const persistedState = loadState();
console.log(persistedState);

const initialState = {
  username: persistedState?.username,
  filters: {
    temperature: [],
    flavour: [],
    category: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, { payload }) {
      state.username = payload;
    },
    setFiltersCategory(state, { payload }) {
      state.filters = {
        ...state.filters,
        category: payload,
      };
    },
  },
});

export const { setUsername, setFiltersCategory } = userSlice.actions;

export default userSlice.reducer;
