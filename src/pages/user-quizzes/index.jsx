import { useQuery } from "react-query";
import { getQuizzesService } from "~/services/quiz";
import Loading from "~/components/loading";
import { useNavigate } from "react-router-dom";

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
            className="bg-yellow-400/50 p-4 rounded-lg"
          >
            {idx + 1}. {quiz.name} - {quiz.difficulty} - {quiz.questionNumber}{" "}
            questions
          </button>
        ))}
      </div>
    </div>
  );
}
