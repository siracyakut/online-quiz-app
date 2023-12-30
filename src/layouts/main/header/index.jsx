import { Link, NavLink, useHref } from "react-router-dom";
import { useAuth } from "~/store/auth/hooks";
import UserMenu from "~/components/user-menu";
import { FiLogIn } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import useBreakpoint from "~/hooks/use-breakpoint";

export default function Header() {
  const { email } = useAuth();
  const breakpoint = useBreakpoint();
  const href = useHref("/");

  return (
    <header className="w-full flex items-center justify-between border rounded-lg p-5 my-7">
      <Link
        to="/"
        className="font-bold text-xl flex items-center gap-x-2 justify-center"
      >
        <img
          src={`${href}/quiz-2.png`}
          alt="logo image"
          className="w-10 h-10 object-contain"
        />
        Quiz App <span className="font-medium text-xs">v1.0</span>
      </Link>
      {email ? (
        <UserMenu adminPage={false} />
      ) : (
        <div className="flex items-center justify-center gap-x-4 md:gap-x-20">
          <NavLink
            to="/login"
            className="flex items-center gap-x-2 px-4 py-1 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition-all uppercase tracking-wider"
          >
            <FiLogIn />
            {breakpoint !== "mobile" && "Login"}
          </NavLink>
          <NavLink
            to="/register"
            className="flex items-center gap-x-2 px-4 py-1 rounded-md border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition-all uppercase tracking-wider"
          >
            <IoMdPersonAdd />
            {breakpoint !== "mobile" && "Register"}
          </NavLink>
        </div>
      )}
    </header>
  );
}
