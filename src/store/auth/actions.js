import store from "~/store";
import { _login, _logout } from "~/store/auth";

export const login = (data) => store.dispatch(_login(data));
export const logout = () => store.dispatch(_logout());
