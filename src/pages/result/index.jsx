import { useGame } from "~/store/game/hooks";
import { Navigate } from "react-router-dom";

export default function Result() {
  const { userAnswers } = useGame();

  return userAnswers.length > 0 ? (
    <div className="border p-5 flex items-center justify-center rounded-lg">
      <pre>{JSON.stringify(userAnswers, null, 2)}</pre>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
