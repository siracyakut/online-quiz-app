import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  admin: 0,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    _login: (state, action) => {
      state.email = action.payload.email;
      state.admin = action.payload.admin;
    },
    _logout: (state) => {
      state.email = "";
      state.admin = 0;
    },
  },
});

export const { _login, _logout } = auth.actions;
export default auth.reducer;
