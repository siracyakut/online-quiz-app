import { useAuth } from "~/store/auth/hooks";
import { CATEGORIES } from "~/constants/categories";
import { Link } from "react-router-dom";

export default function Home() {
  const { email } = useAuth();

  return (
    <div className="border p-5 rounded-lg grid place-items-center md:flex gap-x-10 w-full">
      <div className="max-w-[150px] mb-10 md:mb-0 md:max-w-xs">
        <img
          className="object-contain"
          src={`${window.location.origin}/quiz-1.png`}
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col gap-7">
        <h2 className="text-4xl text-center md:text-start font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Welcome to the Quiz App!
        </h2>
        {email ? (
          <>
            <p className="text-xl italic">
              Choose your favorite area of expertise and start solving
              challenging quizzes!
            </p>
            <div className="w-full p-4 border rounded-lg flex flex-wrap gap-2.5">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  className="px-4 py-2 bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-600 hover:-translate-y-1 transition-all"
                  to={`/choice-page/${category.id}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="w-full flex items-center gap-x-4">
              <div className="flex-1 h-0.5 bg-black/20 rounded-lg" />
              <p className="text-black font-medium italic">OR</p>
              <div className="flex-1 h-0.5 bg-black/20 rounded-lg" />
            </div>
            <Link
              to="/user-quizzes"
              className="text-center px-4 py-2 bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-600 hover:-translate-y-1 transition-all"
            >
              Check out the quizzes created by our own members!
            </Link>
          </>
        ) : (
          <>
            <p className="text-xl text-center md:text-start">
              Log in now to solve challenging and exciting quizzes and compete
              with your rivals!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
