import { MdLeaderboard } from "react-icons/md";
import { Tab } from "@headlessui/react";
import { CATEGORIES } from "~/constants/categories";
import classNames from "classnames";
import { useState } from "react";
import { useQuery } from "react-query";
import { leaderboardService } from "~/services/game";
import Loading from "~/components/loading";
import LeaderboardItem from "~/pages/leaderboards/leaderboard-item";

export default function Leaderboards() {
  const [currentCategory, setCurrentCategory] = useState({
    name: "Music",
    id: "music",
  });
  const { data, error, isFetching } = useQuery(
    ["leaderboards", currentCategory],
    () => leaderboardService({ category: currentCategory.id }),
  );

  return (
    <div className="p-5 border rounded-lg flex flex-col items-center justify-center gap-4">
      <div className="w-full flex items-center justify-center gap-x-4">
        <MdLeaderboard size={40} color="orange" className="flex-shrink-0" />
        <div className="text-2xl font-bold text-orange-400 tracking-widest text-center">
          <p className="border-b-2">LEADERBOARDS</p>
          <p>{currentCategory.name.toUpperCase()}</p>
        </div>
      </div>
      <Tab.Group
        onChange={(index) =>
          setCurrentCategory({
            name: CATEGORIES.at(index).name,
            id: CATEGORIES.at(index).id,
          })
        }
      >
        <Tab.List className="flex items-center justify-center flex-wrap gap-2.5 border p-2.5 rounded-lg w-full md:w-full">
          {({ selectedIndex }) =>
            CATEGORIES.map((category, idx) => (
              <Tab
                key={category.id}
                className={classNames(
                  "p-2 md:px-4 md:py-2 bg-orange-300 text-sm md:text-base font-medium rounded-md outline-none",
                  {
                    "border-2 border-orange-900": selectedIndex === idx,
                  },
                )}
              >
                {category.name}
              </Tab>
            ))
          }
        </Tab.List>
        <Tab.Panels>
          {isFetching ? (
            <Loading />
          ) : error ? (
            <p className="bg-red-200 text-red-700 p-4 rounded-lg">
              {error.data}
            </p>
          ) : (
            CATEGORIES.map((category) => (
              <Tab.Panel
                key={category.id}
                className="flex flex-col items-center gap-y-8 w-full h-[500px] overflow-y-auto border p-4 rounded-lg"
              >
                {data.data.map((user, idx) => (
                  <LeaderboardItem key={idx} id={idx} user={user} />
                ))}
              </Tab.Panel>
            ))
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
