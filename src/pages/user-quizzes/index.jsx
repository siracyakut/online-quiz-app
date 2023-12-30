import { useQuery } from "react-query";
import { getQuizzesService } from "~/services/quiz";
import Loading from "~/components/loading";
import { useNavigate } from "react-router-dom";
import { PiListNumbers } from "react-icons/pi";
import { BsSpeedometer2 } from "react-icons/bs";

export default function UserQuizzes() {
  const { data, error, isFetching } = useQuery(["quizzes"], () =>
    getQuizzesService(),
  );
  const navigate = useNavigate();

  return isFetching ? (
    <Loading />
  ) : error ? (
    <p className="bg-red-200 text-red-700 p-4 rounded-lg">
      {error.data || error.error}
    </p>
  ) : (
    <div className="p-5 border rounded-lg flex items-center justify-center">
      <div className="flex flex-col gap-4 border rounded-lg p-4">
        {data.data.map((quiz, idx) => (
          <button
            onClick={() =>
              navigate("/game", {
                state: {
                  difficulty: quiz.difficulty,
                  category: quiz.category,
                  limit: quiz.questionNumber,
                  isTrivia: false,
                  quizId: quiz.quizId,
                },
              })
            }
            key={idx}
            className="w-full flex flex-col items-center justify-center bg-orange-200/50 rounded-lg px-4 py-2 hover:bg-orange-200/90 hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-x-2">
              <p className="font-bold text-xl text-orange-400">{idx + 1}.</p>
              <p>
                {quiz.name.length > 22
                  ? quiz.name.slice(0, 22) + "..."
                  : quiz.name}
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-1">
                <PiListNumbers color="green" size={18} />
                <p className="text-sm">{quiz.questionNumber} questions</p>
              </div>
              <div className="flex items-center gap-x-1">
                <BsSpeedometer2 color="red" size={18} />
                <p className="text-sm">{quiz.difficulty} difficulty</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
