import PropTypes from "prop-types";
import { useGame } from "~/store/game/hooks";
import { useMemo } from "react";
import shuffle from "~/utils/shuffle";
import {
  addUserAnswer,
  incrementCurrentQuestion,
  setClicked,
  setScore,
  setTime,
} from "~/store/game/actions";
import { calculateTotalScore } from "~/utils/calculations";
import classNames from "classnames";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import correctSonud from "~/assets/sounds/correct.mp3";
import wrongSonud from "~/assets/sounds/wrong.mp3";
import useSound from "use-sound";

export default function GameAnswers({ data, limit }) {
  const { currentQuestion, userAnswers, time, clicked } = useGame();
  const navigate = useNavigate();

  const [playCorrect] = useSound(correctSonud, { interrupt: true });
  const [playWrong] = useSound(wrongSonud, { interrupt: true });

  const shuffledAnswers = useMemo(() => {
    const answers = [data.correctAnswer, ...data.incorrectAnswers];
    return shuffle(answers);
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    if (!clicked) {
      setClicked(true);
      addUserAnswer(
        import.meta.env.VITE_SECONDS_PER_QUESTION - time,
        answer === data.correctAnswer,
      );
      if (answer === data.correctAnswer) {
        const score = calculateTotalScore(
          limit,
          [
            ...userAnswers,
            {
              time: import.meta.env.VITE_SECONDS_PER_QUESTION - time,
              result: answer === data.correctAnswer,
            },
          ],
          import.meta.env.VITE_SECONDS_PER_QUESTION,
        );
        setScore(score);
        playCorrect();
      } else {
        playWrong();
      }
      setTimeout(() => {
        setClicked(false);
        if (currentQuestion === limit - 1) {
          navigate("/result", {
            state: {
              category: data.category,
              difficulty: data.difficulty,
              limit,
            },
          });
        } else {
          incrementCurrentQuestion();
        }
        setTime(import.meta.env.VITE_SECONDS_PER_QUESTION);
      }, 2000);
    }
  };

  return (
    <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
      {shuffledAnswers.map((answer) => (
        <button
          key={answer}
          type="button"
          className={classNames(
            "bg-blue-200 flex items-center justify-center gap-x-2 text-center p-3 rounded-lg hover:bg-blue-500 hover:text-white hover:font-bold hover:scale-105 transition-all",
            {
              "!bg-green-600 !text-white !hover:bg-green-600 !font-bold":
                clicked && answer === data.correctAnswer,
              "!bg-red-500 !text-white !hover:bg-red-500 !font-bold":
                clicked && answer !== data.correctAnswer,
            },
          )}
          onClick={() => handleAnswer(answer)}
          disabled={clicked}
        >
          <span className="flex-shrink-0">
            {!clicked ? (
              answer === data.correctAnswer ? (
                <FaCheck />
              ) : (
                <FaTimes />
              )
            ) : (
              ""
            )}
          </span>
          <p>{answer}</p>
        </button>
      ))}
    </div>
  );
}

GameAnswers.propTypes = {
  data: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired,
};
