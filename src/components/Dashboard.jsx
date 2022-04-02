import { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";

export default function Dashboard() {
  const username = new URLSearchParams(window.location.search).get("username");
  const [profile, setProfile] = useState([]);
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}`).then(
      (response) => {
        if (response.ok) {
          let j = response.json().then((j) => setProfile(j));
        }
      }
    );

    document.title = `${profile.username} - ChessBoard`;
  }, []);

  const premiumCheck = (profile) => {
    if (profile.status === "undefiend") {
      return "no";
    } else {
      return profile.status === "premium" ? "✅ Premium" : "⛔ Premium";
    }
  };

  return (
    <section>
      <div className="container flex flex-row w-1/2 mt-20 mx-auto text-white">
        <img src={profile.avatar} width="170px" className="rounded-[30px]" />
        <div className="mt-2 ml-4">
          <h1 className="text-5xl mb-3">{profile.username}</h1>
          <div className="flex flex-row mb-2">
            <button className="bg-b-button py-1 px-3 rounded-xl text-t-lightpurple mr-2">
              {profile.player_id}
            </button>
            <button className="bg-b-button py-1 px-3 rounded-xl text-t-lightpurple mr-2">
              {profile.followers} Followers
            </button>
            <button className="bg-b-button py-1 px-3 rounded-xl text-t-lightpurple mr-2">
              {premiumCheck(profile)}
            </button>
            <a
              className="bg-b-button py-1 px-3 rounded-xl  mr-2"
              href={profile.url}
            >
              View Profile
            </a>
          </div>
          <div className="flex flex-row gap-8">
            <p className="text-t-darkpurple ml-2">
              Joined: {new Date(profile.joined * 1000).toDateString().slice(4)}
            </p>
            <p className="">
              Last Online:{" "}
              {new Date(profile.last_online * 1000).toDateString().slice(4)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 w-1/2 mx-auto text-white">
        <Tabs>
          <Tabs.Tab label="Rapid">
            <div>
              <div className="flex flex-row gap-20 ml-2">
                <div>
                  <p className="text-sm font-bold">Current</p>
                  <p className="text-sm text-t-darkpurple">Apr 02 2022</p>
                  <p>728</p>
                </div>
                <div>
                  <p className="text-sm font-bold">Best</p>
                  <p className="text-sm text-t-darkpurple">Apr 02 2022</p>
                  <p className="text-green-500">866</p>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="px-5 py-0.5 bg-b-button text-green-500 rounded-[30px]">
                  83 Wins
                </button>
                <button className="px-5 py-0.5 bg-b-button text-red-500 rounded-[30px]">
                  63 Losses
                </button>
                <button className="px-5 py-0.5 bg-b-button text-gray-500 rounded-[30px]">
                  6 Draws
                </button>
              </div>
            </div>
          </Tabs.Tab>
        </Tabs>
      </div>
    </section>
  );
}
