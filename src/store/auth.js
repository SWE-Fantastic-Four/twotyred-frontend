import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: 0,
  photoUrl: "",
  displayName: "",
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
    },
    updateProfilePhoto: (state, action) => {
      state.photoUrl = action.payload;
    },
    updateDisplayName: (state, action) => {
      state.displayName = action.payload;
    }
  }
})

export const { login, logout, updateProfilePhoto, updateDisplayName } = authSlice.actions;

export default authSlice.reducer;
