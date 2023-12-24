import CountUp from "react-countup";
import { useQuery } from "react-query";
import { getUserService } from "~/services/auth";
import { useAuth } from "~/store/auth/hooks";
import Loading from "~/components/loading";

export default function Stats() {
  const { email } = useAuth();
  const { data, error, isFetching } = useQuery(["userInfo"], () =>
    getUserService({ email }),
  );

  return isFetching ? (
    <Loading />
  ) : error ? (
    <p className="bg-red-200 text-red-700 p-4 rounded-lg">
      {error.data || error.error}
    </p>
  ) : (
    <div className="border p-5 rounded-lg flex flex-col items-center justify-center gap-5">
      <div className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-blue-950">
        YOU ARE
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="border w-[200px] rounded-md p-2.5 flex flex-col items-center justify-center text-center">
          <p className="text-xl">SOLVED</p>
          <CountUp
            className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-blue-950"
            start={0}
            end={data.data.quizCount}
          />
          <p className="text-xl">QUIZZES</p>
        </div>
        <div className="border rounded-md p-2.5 flex flex-col items-center justify-center text-center">
          <p className="text-xl">GIVED</p>
          <CountUp
            className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-blue-950"
            start={0}
            end={data.data.trueCount}
          />
          <p className="text-xl">CORRECT ANSWERS</p>
        </div>
        <div className="border rounded-md p-2.5 flex flex-col items-center justify-center text-center">
          <p className="text-xl">GIVED</p>
          <CountUp
            className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-blue-950"
            start={0}
            end={data.data.falseCount}
          />
          <p className="text-xl">WRONG ANSWERS</p>
        </div>
      </div>
    </div>
  );
}
