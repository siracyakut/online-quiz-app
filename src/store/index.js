import { configureStore } from "@reduxjs/toolkit";
import auth from "~/store/auth";
import game from "~/store/game";

const store = configureStore({
  reducer: {
    auth,
    game,
  },
  devTools: false,
});

export default store;
