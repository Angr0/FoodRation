import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../src/localStorage.js";

const persistedState = loadState();
console.log(persistedState);

const initialState = {
  username: persistedState?.username,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, { payload }) {
      state.username = payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
