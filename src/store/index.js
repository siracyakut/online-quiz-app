import { configureStore } from "@reduxjs/toolkit";
import auth from "~/store/auth";

const store = configureStore({
  reducer: {
    auth,
  },
  devTools: false,
});

export default store;
