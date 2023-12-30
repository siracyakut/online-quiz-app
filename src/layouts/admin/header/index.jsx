import { Link, useHref } from "react-router-dom";
import UserMenu from "~/components/user-menu";

export default function AdminHeader() {
  const href = useHref("/");

  return (
    <header className="w-full flex items-center justify-between border rounded-lg p-5 my-7">
      <Link
        to="/admin"
        className="font-bold text-xl flex items-center gap-x-2 justify-center"
      >
        <img
          src={`${href}/quiz-2.png`}
          alt="logo image"
          className="w-10 h-10 object-contain"
        />
        Quiz App
        <span className="font-medium text-xs text-red-700">ADMIN PANEL</span>
      </Link>
      <UserMenu adminPage={true} />
    </header>
  );
}
