import { useLocation, useNavigate } from "react-router-dom";
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
    },
  );

  useEffect(() => {
    let timer;

    if (!isFetching && !error) {
      timer = setInterval(() => {
        if (time === 0) {
          if (currentQuestion === limit - 1) {
            navigate("/result");
          } else {
            addUserAnswer(
              import.meta.env.VITE_SECONDS_PER_QUESTION - time,
              false,
            );
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

  return isFetching ? <Loading /> : <GameArea data={data} limit={limit} />;
}
