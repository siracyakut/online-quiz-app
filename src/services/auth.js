import { get, post } from "~/utils/request";

export const checkAuthService = () => get("/users/auth");
export const loginService = (data) => post("/users/login", data);
export const registerService = (data) => post("/users/register", data);
export const logoutService = () => get("/users/logout");