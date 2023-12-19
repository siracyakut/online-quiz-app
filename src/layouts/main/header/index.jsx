import { Link, NavLink } from "react-router-dom";
import { useAuth } from "~/store/auth/hooks";
import UserMenu from "~/components/user-menu";

export default function Header() {
  const { email } = useAuth();

  return (
    <header className="w-full flex items-center justify-between border rounded-lg p-5 my-7">
      <Link
        to="/"
        className="font-bold text-xl flex items-center gap-x-2 justify-center"
      >
        Quiz App <span className="font-medium text-xs self-end">v1.0</span>
      </Link>
      {email ? (
        <UserMenu />
      ) : (
        <div className="flex items-center justify-center gap-x-10 md:gap-x-20">
          <NavLink
            to="/login"
            className="px-4 py-1 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition-all uppercase tracking-wider"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-1 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition-all uppercase tracking-wider"
          >
            Register
          </NavLink>
        </div>
      )}
    </header>
  );
}
