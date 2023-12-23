import store from "~/store";
import { _login, _logout } from "~/store/auth";
import * as jose from "jose";
import toast from "react-hot-toast";

export const login = async (jwt, message) => {
  const { payload } = await jose.jwtVerify(
    jwt,
    new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET),
  );

  if (payload) {
    if (message) toast.success("You are successfully logged in.");
    store.dispatch(_login({ email: payload.email, admin: payload.admin }));
  } else {
    if (message) toast.error("Invalid token!");
  }
};
export const logout = () => store.dispatch(_logout());
