import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import CountUp from "react-countup";
import PropTypes from "prop-types";
import { FaTimes, FaCheck, FaClock, FaStar } from "react-icons/fa";
import classNames from "classnames";
import { useGame } from "~/store/game/hooks";

export default function ResultAnswers({ answers, trueCount, falseCount }) {
  const { score } = useGame();

  return (
    <>
      <p className="flex items-center justify-center gap-x-2 text-2xl font-bold text-blue-500 text-center">
        <HiOutlineClipboardDocumentCheck size={40} />
        YOUR ANSWERS
      </p>
      <div className="text-center border p-5 rounded-lg grid gap-3">
        <div className="flex items-center justify-center gap-x-7 bg-blue-200 p-3 border rounded-md mb-2 font-bold">
          <div className="flex items-center gap-x-1.5">
            <FaCheck color="green" />
            <CountUp start={0} end={trueCount} />
          </div>
          <div className="flex items-center gap-x-1.5">
            <FaTimes color="red" />
            <CountUp start={0} end={falseCount} />
          </div>
          <div className="flex items-center gap-x-1.5">
            <FaStar color="orange" />
            <CountUp start={0} end={score} decimals={2} />
          </div>
        </div>
        {answers.map((answer, idx) => (
          <div
            key={idx}
            className={classNames(
              "p-3 border rounded-md flex items-center gap-x-4",
              {
                "bg-green-200/50": answer.result,
                "bg-red-200/50": !answer.result,
              },
            )}
          >
            <div className="flex items-center gap-x-2">
              {answer.result ? (
                <FaCheck color="green" />
              ) : (
                <FaTimes color="red" />
              )}
              <p className="text-sm">Question {idx + 1}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <FaClock color="orange" />
              <p className="text-sm">{answer.time} seconds</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

ResultAnswers.propTypes = {
  answers: PropTypes.array.isRequired,
  trueCount: PropTypes.number.isRequired,
  falseCount: PropTypes.number.isRequired,
};
