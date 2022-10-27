import { createSlice } from "@reduxjs/toolkit";


const userId = localStorage.key(0)
const token = localStorage.getItem(userId)



const initialAuthState = {
  isAuthenticated: localStorage.length > 0,
  token: token,
  userId: userId,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    isAuthenticated(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
