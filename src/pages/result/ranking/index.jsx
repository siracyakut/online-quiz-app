import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import CountUp from "react-countup";
import { findOrdinalNumber } from "~/utils/formatters";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

export default function ResultRanking({ placement, maxPlace, score }) {
  return (
    <>
      <p className="flex items-center justify-center gap-x-2 text-2xl font-bold text-blue-500 text-center">
        <HiOutlineClipboardDocumentList size={40} />
        YOUR RESULT
      </p>
      <div className="text-center text-medium text-xl border p-5 rounded-lg flex flex-col items-center justify-center gap-4">
        <p>
          You ranked{" "}
          <span className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            <CountUp
              start={maxPlace}
              end={placement}
              duration={3}
              prefix="#"
              suffix={findOrdinalNumber(placement, true)}
            />
          </span>{" "}
          among{" "}
          <span className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            <CountUp end={maxPlace} duration={3} />
          </span>{" "}
          people in this quiz.
        </p>
        <p className="flex items-center gap-x-2">
          You earned
          <FaStar color="orange" />
          <span className="flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700">
            <CountUp start={0} end={score} decimals={2} />
          </span>{" "}
          points in total in this quiz.
        </p>
      </div>
    </>
  );
}

ResultRanking.propTypes = {
  placement: PropTypes.number.isRequired,
  maxPlace: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
