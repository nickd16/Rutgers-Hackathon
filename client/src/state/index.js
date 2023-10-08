import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("imageinate-user")
    ? JSON.parse(localStorage.getItem("imageinate-user"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUpdateUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUpdateUser, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
