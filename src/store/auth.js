import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: 0
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = 1;
    },
    logout: (state) => {
      state.isLoggedIn = 0;
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
