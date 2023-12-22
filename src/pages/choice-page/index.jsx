import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CATEGORIES } from "~/constants/categories";
import { useState } from "react";
import classNames from "classnames";

export default function ChoicePage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [diff, setDiff] = useState("medium");
  const [questNumber, setQuestNumber] = useState(10);
  const question_numbers = [10, 20, 30, 40, 50];
  const difficulties = ["Easy", "Medium", "Hard"];
  const category = CATEGORIES.find((x) => x.id === categoryId);

  return category === undefined ? (
    <Navigate to="/" />
  ) : (
    <div className="border p-5 rounded-lg flex flex-col gap-5 items-center justify-center">
      <h1 className="font-bold text-2xl">Make your choice!</h1>
      <div className="flex items-center gap-x-4">
        <p className="text-xl">Category: </p>
        <button className="px-4 py-2 bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-600 hover:-translate-y-1 transition-all">
          {category.name}
        </button>
      </div>
      <div className="flex items-center gap-x-4">
        <p className="text-xl">Difficulty: </p>
        {difficulties.map((currentDiff) => (
          <button
            key={currentDiff}
            className={classNames(
              "px-4 py-2 bg-yellow-400 rounded-lg shadow-md hover:-translate-y-1 transition-all",
              {
                "bg-yellow-600": diff === currentDiff.toLowerCase(),
              },
            )}
            onClick={() => setDiff(currentDiff.toLowerCase())}
          >
            {currentDiff}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <p className="text-xl">Number of Questions: </p>
        {question_numbers.map((number) => (
          <button
            key={number}
            className={classNames(
              "px-4 py-2 bg-yellow-400 rounded-lg shadow-md hover:-translate-y-1 transition-all",
              {
                "bg-yellow-600": number === questNumber,
              },
            )}
            onClick={() => setQuestNumber(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() =>
          navigate("/game", {
            state: {
              difficulty: diff,
              category: category.id,
              limit: questNumber,
              isTrivia: true,
            },
          })
        }
        className="w-1/2 px-4 py-2 bg-red-400 rounded-lg shadow-md hover:bg-red-600 text-white font-bold hover:-translate-y-1 transition-all"
      >
        START QUIZ!
      </button>
    </div>
  );
}
