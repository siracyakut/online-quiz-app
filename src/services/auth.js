import { get, post } from "~/utils/request";

export const checkAuthService = () => get("/users/auth");
export const loginService = (data) => post("/users/login", data);
export const loginGoogleService = (data) => post("/users/google-login", data);
export const registerService = (data) => post("/users/register", data);
export const registerGoogleService = (data) =>
  post("/users/google-register", data);
export const logoutService = () => get("/users/logout");
export const updateUserService = (data) => post("/users/update-user", data);
export const changePasswordService = (data) =>
  post("/users/change-password", data);
export const getUserService = (data) => post("/users/get-info", data);
