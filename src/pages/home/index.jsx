export default function Home() {
  return (
    <div className="border p-5 rounded-lg grid place-items-center md:flex gap-x-10 w-full">
      <div className="max-w-[150px] mb-10 md:mb-0 md:max-w-xs">
        <img className="object-contain" src="quiz-1.png" alt="" />
      </div>
      <div className="flex-1 flex flex-col gap-10">
        <h2 className="text-4xl text-center md:text-start font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Welcome to the Quiz App!
        </h2>
        <p className="text-xl text-center md:text-start">
          Log in now to solve challenging and exciting quizzes and compete with
          your rivals!
        </p>
      </div>
    </div>
  );
}
