import { FaStar } from "react-icons/fa";
import CountUp from "react-countup";
import { PiListNumbers } from "react-icons/pi";
import { BsSpeedometer2 } from "react-icons/bs";
import PropTypes from "prop-types";

export default function LeaderboardItem({ id, user }) {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-orange-200/50 rounded-lg px-4 py-2">
      <div className="flex items-center gap-x-2">
        <p className="font-bold text-xl text-orange-400">{id + 1}.</p>
        <p>
          {user.user.length > 22 ? user.user.slice(0, 22) + "..." : user.user}
        </p>
        <div className="flex items-center gap-x-1">
          <FaStar color="orange" />
          <p className="font-bold text-orange-500">
            <CountUp start={0} end={user.score.$numberDecimal} decimals={2} />
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <PiListNumbers color="green" size={18} />
          <p className="text-sm">{user.questionNumber} questions</p>
        </div>
        <div className="flex items-center gap-x-1">
          <BsSpeedometer2 color="red" size={18} />
          <p className="text-sm">{user.difficulty} difficulty</p>
        </div>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};
