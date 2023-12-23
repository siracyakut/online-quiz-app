import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getTriviaQuestions } from "~/services/game";
import { useEffect } from "react";
import {
  addUserAnswer,
  incrementCurrentQuestion,
  setCurrentQuestion,
  setScore,
  setTime,
  setUserAnswers,
} from "~/store/game/actions";
import GameArea from "~/components/game-area";
import Loading from "~/components/loading";
import { useGame } from "~/store/game/hooks";
import toast from "react-hot-toast";

export default function Game() {
  const states = useLocation().state;
  const difficulty = states && states.difficulty;
  const category = states && states.category;
  const limit = states && states.limit;
  const isTrivia = states && states.isTrivia;
  const { time, currentQuestion } = useGame();
  const navigate = useNavigate();

  const { data, error, isFetching } = useQuery(
    ["questions", category],
    () => getTriviaQuestions(difficulty, category, limit),
    {
      onSuccess: () => {
        setCurrentQuestion(0);
        setTime(import.meta.env.VITE_SECONDS_PER_QUESTION);
        setScore(0);
        setUserAnswers([]);
      },
      onError: () => {
        toast.error(
          "There was a problem with the trivia api, please try again later.",
        );
        navigate("/", { replace: true });
      },
    },
  );

  useEffect(() => {
    let timer;

    if (!isFetching && !error) {
      timer = setInterval(() => {
        if (time === 0) {
          addUserAnswer(
            import.meta.env.VITE_SECONDS_PER_QUESTION - time,
            false,
          );
          if (currentQuestion === limit - 1) {
            navigate("/result", { state: { category, difficulty, limit } });
          } else {
            incrementCurrentQuestion();
            setTime(import.meta.env.VITE_SECONDS_PER_QUESTION);
            return;
          }
        }
        setTime(time - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isFetching, time]);

  return states ? (
    isFetching ? (
      <Loading />
    ) : (
      <GameArea data={data} limit={limit} />
    )
  ) : (
    <Navigate to="/" />
  );
}
