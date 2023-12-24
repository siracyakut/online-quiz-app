import { useGame } from "~/store/game/hooks";
import { Navigate, useLocation } from "react-router-dom";
import ResultRanking from "~/pages/result/ranking";
import ResultAnswers from "~/pages/result/answers";
import { useMutation, useQuery } from "react-query";
import { userPlacementService } from "~/services/game";
import { useAuth } from "~/store/auth/hooks";
import Loading from "~/components/loading";
import { updateUserService } from "~/services/auth";

export default function Result() {
  const { userAnswers, score } = useGame();
  const { email } = useAuth();

  const states = useLocation().state;
  const limit = states && states.limit;
  const difficulty = states && states.difficulty;
  const category = states && states.category;

  const trueCount = userAnswers.filter((x) => x.result).length;
  const falseCount = userAnswers.filter((x) => !x.result).length;

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
    {
      enabled: userAnswers.length > 0,
      onSuccess: () =>
        saveMutation.mutate({
          email,
          addTrue: trueCount,
          addFalse: falseCount,
          addQuiz: 1,
        }),
    },
  );

  const saveMutation = useMutation({
    mutationFn: (data) => updateUserService(data),
  });

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
