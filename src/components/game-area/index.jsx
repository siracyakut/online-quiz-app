import { useGame } from "~/store/game/hooks";
import PropTypes from "prop-types";
import GameUtils from "~/components/game-area/game-utils";
import GameAnswers from "~/components/game-area/game-answers";

export default function GameArea({ data, limit }) {
  const { currentQuestion } = useGame();

  return (
    <div className="border p-5 rounded-lg flex flex-col items-center justify-center">
      <GameUtils limit={limit} />
      <div className="w-full md:w-1/2 border flex items-center justify-center text-center p-3 rounded-lg bg-blue-200 text-xl md:text-2xl shadow-lg">
        {data[currentQuestion].question.text}
      </div>
      <GameAnswers data={data[currentQuestion]} limit={limit} />
    </div>
  );
}

GameArea.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
};
