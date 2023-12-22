import ProgressBar from "@ramonak/react-progress-bar";
import PropTypes from "prop-types";
import { useGame } from "~/store/game/hooks";
import { GoStarFill } from "react-icons/go";

export default function GameUtils({ limit }) {
  const { currentQuestion, time, score } = useGame();

  return (
    <div className="w-full md:w-1/2 flex items-center gap-x-4 mb-4">
      <p className="flex-shrink-0 flex items-center justify-center p-3 w-12 h-12 rounded-full bg-black text-white text-sm">
        {currentQuestion + 1}/{limit}
      </p>
      <div className="w-full">
        <ProgressBar
          completed={time.toString()}
          maxCompleted={parseInt(import.meta.env.VITE_SECONDS_PER_QUESTION)}
          labelAlignment="center"
          dir="ltr"
          baseBgColor="#eeeeee"
          bgColor={
            time >= 20 && time <= 30
              ? "green"
              : time >= 10 && time <= 19
              ? "orange"
              : "red"
          }
        />
      </div>
      <p className="flex-shrink-0 flex items-center justify-center gap-x-2 font-medium px-4 py-2 bg-yellow-400 text-black rounded-lg">
        <GoStarFill />
        {score.toFixed(2)}
      </p>
    </div>
  );
}

GameUtils.propTypes = {
  limit: PropTypes.number.isRequired,
};
