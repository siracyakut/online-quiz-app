import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useAuth } from "~/store/auth/hooks";
import { useMutation } from "react-query";
import { logoutService } from "~/services/auth";
import { logout } from "~/store/auth/actions";
import toast from "react-hot-toast";
import { MdLeaderboard } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import useBreakpoint from "~/hooks/use-breakpoint";

export default function UserMenu() {
  const { email } = useAuth();
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();

  const logoutMutation = useMutation({
    mutationFn: () => logoutService(),
    onSuccess: () => {
      logout();
      toast.success("You have successfully logged out of your account.");
      navigate("/");
    },
    onError: () =>
      toast.error(
        "An error occurred while logging out, please try again later.",
      ),
  });

  return (
    <div className="flex items-center justify-center gap-x-4">
      <Link
        to="/leaderboards"
        className="flex items-center h-7 md:h-auto gap-x-2 px-4 py-1 bg-blue-400 rounded-lg text-white font-medium hover:bg-blue-600 transition-all"
      >
        <MdLeaderboard />
        {breakpoint !== "mobile" && <p>Leaderboards</p>}
      </Link>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center h-7 md:h-auto gap-x-2 px-4 py-1 bg-blue-400 rounded-lg text-white font-medium hover:bg-blue-600 transition-all">
          <BsPersonCircle />
          {breakpoint !== "mobile" && <p>Welcome, {email}</p>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-white hover:text-violet-100"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="transition-all shadow-xl absolute right-0 grid bg-blue-400 mt-1 rounded-lg overflow-hidden">
            <Menu.Item>
              <Link
                className="flex items-center gap-x-1 px-4 py-2 text-white hover:bg-blue-600"
                to="/profile"
              >
                <IoPerson />
                My Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="flex items-center gap-x-1 px-4 py-2 text-white bg-red-400 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isLoading}
              >
                <RiLogoutBoxFill />
                Logout
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
