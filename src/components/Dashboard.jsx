import { useEffect, useState } from "react";
import { Tabs, MantineProvider } from "@mantine/core";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { countryCode } from "emoji-flags";

export default function Dashboard() {
  const username = new URLSearchParams(window.location.search).get("username");
  const [profile, setProfile] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const statSlice = Object.fromEntries(Object.entries(stats).slice(0, 4));
  const tacticts = Object.fromEntries(Object.entries(stats).slice(4, 5));
  const puzzleRush = Object.fromEntries(Object.entries(stats).slice(6));
  const rushList = Object.values(puzzleRush);
  const statList = Object.values(statSlice);
  const tacticList = Object.values(tacticts);

  const gameCategory = ["Daily", "Rapid", "Bullet", "Blitz"];

  useEffect(() => {
    fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}`).then(
      (response) => {
        if (response.ok) {
          let j = response.json().then((j) => setProfile(j));
        }
      }
    );

    fetch(
      `https://api.chess.com/pub/player/${username.toLowerCase()}/stats`
    ).then((response) => {
      if (response.ok) {
        let k = response.json().then((k) => setStats(k));
      }
    });

    setLoading(false);
    document.title = `${username} - ChessBoard`;
  }, []);

  const winRate = (stat) => {
    let win = stat.record.win;
    let loss = stat.record.loss;
    let draw = stat.record.draw;

    return (
      Math.round(((2 * (win + draw)) / (2 * (win + loss + draw))) * 100) + "%"
    );
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <section>
        <div className="container flex flex-row mt-20 mx-auto justify-center text-white">
          <img
            id="profile-img"
            src={profile.avatar ? profile.avatar : "/default-image.svg"}
            width="170px"
            className="rounded-[30px]"
          />
          <div className="mt-2 ml-4">
            <div className="flex items-center">
              <h1 className="text-5xl mb-3">{username}</h1>
              {new Date().getTime() / 1000 - profile.last_online <= 300 ? (
                <CheckCircleIcon className="text-green-500 w-10 ml-1" />
              ) : (
                <XCircleIcon className="text-red-500 w-10 ml-1" />
              )}
            </div>
            <div className="flex flex-row mb-2">
              <button className="bg-b-button py-1 px-3 rounded-xl text-t-lightpurple mr-2">
                {profile.country
                  ? countryCode(profile.country.slice(34)).emoji +
                    ` ${profile.country.slice(34)}`
                  : "loading"}
              </button>
              <button className="bg-b-button py-1 px-3 rounded-xl text-t-lightpurple mr-2">
                {profile.followers} Followers
              </button>
              <button className="bg-b-button py-1 px-3 rounded-xl text-t-lightpurple mr-2">
                {profile.status === "premium" ? "✅ Premium" : "⛔ Premium"}
              </button>
              <a
                className="bg-b-button py-1 px-3 rounded-xl  mr-2"
                href={profile.url}
                target="_blank"
              >
                View Profile
              </a>
            </div>
            <div className="flex flex-row gap-8">
              <p className="text-t-darkpurple ml-2">
                Joined:{" "}
                {new Date(profile.joined * 1000).toDateString().slice(4)}
                {` - `}
                {new Date().getFullYear() -
                  new Date(profile.joined * 1000).getFullYear()}
                {` Years`}
              </p>
              <p className="">
                Last Online:{" "}
                {new Date(profile.last_online * 1000).toDateString().slice(4)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 text-white">
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Tabs position="apart" variant="pills">
              {statList.map((stat, index) => (
                <Tabs.Tab label={gameCategory[index]} key={stat.last.rating}>
                  <div className="flex flex-col place-items-center mt-2">
                    <div className="flex flex-row gap-20 ml-2">
                      <div>
                        <p className="text-sm font-bold">Current</p>
                        <p className="text-sm text-t-darkpurple">
                          {new Date(stat.last.date * 1000).toDateString()}
                        </p>
                        <p>{stat.last.rating}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Best</p>
                        <p className="text-sm text-t-darkpurple">
                          {new Date(stat.best.date * 1000).toDateString()}
                        </p>
                        <p className="text-green-500">
                          {stat.best.rating} -{" "}
                          <a
                            className="text-blue-500 underline"
                            target="_blank"
                            href={stat.best.game}
                          >
                            Game
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-2">
                      <button className="px-5 py-0.5 bg-b-button text-green-500 rounded-[30px]">
                        {stat.record.win} Wins
                      </button>
                      <button className="px-5 py-0.5 bg-b-button text-red-500 rounded-[30px]">
                        {stat.record.loss} Losses
                      </button>
                      <button className="px-5 py-0.5 bg-b-button text-gray-500 rounded-[30px]">
                        {stat.record.draw} Draws
                      </button>
                    </div>
                    <button className="px-5 py-0.5 w-1/2 mt-2 rounded-[30px] bg-b-button text-blue-500 font-bold">
                      {winRate(stat)} Win Rate
                    </button>
                  </div>
                </Tabs.Tab>
              ))}
              {tacticList.map((obj) => (
                <Tabs.Tab label="Puzzles" key={obj.highest.rating}>
                  <div className="flex flex-row gap-20 ml-2 justify-center mt-2">
                    <div>
                      <p className="text-sm font-bold">Highest</p>
                      <p className="text-sm text-t-darkpurple">
                        {new Date(obj.highest.date * 1000).toDateString()}
                      </p>
                      <p className="text-green-500">{obj.highest.rating}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Lowest</p>
                      <p className="text-sm text-t-darkpurple">
                        {new Date(obj.lowest.date * 1000).toDateString()}
                      </p>
                      <p className="text-red-500">{obj.lowest.rating}</p>
                    </div>
                  </div>
                </Tabs.Tab>
              ))}

              {rushList.map((obj) => (
                <Tabs.Tab label="Puzzle Rush" key={obj.best.score}>
                  <div className="flex flex-row gap-20 ml-2 mt-2 justify-center">
                    <div>
                      <p className="text-sm font-bold">Total Attempts</p>

                      <p className="text-green-500">
                        {obj.best.total_attempts}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Best</p>
                      <p className="text-red-500">{obj.best.score}</p>
                    </div>
                  </div>
                </Tabs.Tab>
              ))}
              {/* gives errors, should be a tab but then it messes up the layout */}
              <p></p>
            </Tabs>
          </MantineProvider>
        </div>
      </section>
    );
  }
}
