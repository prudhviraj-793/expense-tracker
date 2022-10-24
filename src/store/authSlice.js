import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: localStorage.key(0).trim() !== "",
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    isAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    addToken(state, action) {
      state.token = action.payload;
    },
    addUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
