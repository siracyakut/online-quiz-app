import { useGame } from "~/store/game/hooks";
import { Navigate, useLocation } from "react-router-dom";
import ResultRanking from "~/pages/result/ranking";
import ResultAnswers from "~/pages/result/answers";
import { useQuery } from "react-query";
import { userPlacementService } from "~/services/game";
import { useAuth } from "~/store/auth/hooks";
import Loading from "~/components/loading";

export default function Result() {
  const { userAnswers, score } = useGame();
  const { email } = useAuth();

  const states = useLocation().state;
  const limit = states && states.limit;
  const difficulty = states && states.difficulty;
  const category = states && states.category;

  const { data, error, isFetching } = useQuery(
    ["userPlacement"],
    () =>
      userPlacementService({
        email,
        score,
        category,
        difficulty,
        questionNumber: limit,
      }),
    { enabled: userAnswers.length > 0 },
  );

  return isFetching ? (
    <Loading />
  ) : error ? (
    <Navigate to="/" />
  ) : userAnswers.length > 0 && states ? (
    <div className="border p-5 flex flex-col gap-5 items-center justify-center rounded-lg">
      <ResultRanking
        placement={data.data.placement}
        maxPlace={data.data.maxPlace}
        score={score}
      />
      <ResultAnswers answers={userAnswers} />
    </div>
  ) : (
    <Navigate to="/" />
  );
}
