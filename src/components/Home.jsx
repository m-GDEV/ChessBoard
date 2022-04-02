import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const valid = false;
  const [ready, setReady] = useState(false);

  const navigate = useNavigate();

  // maybe validate on home page and then navigate to another route and pass it the username and it does all the fetching.

  //   function checkUsername(username) {
  //     fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}`).then(
  //       (response) => {
  //         setReady(true);
  //         if (response.ok) {
  //           let j = response.json().then((j) => setInfo(j));

  //           setValid(true);
  //         }
  //       }
  //     );
  //   }

  function checkUsername(username) {
    fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}`).then(
      (response) => {
        setReady(true);
        if (response.ok) {
          navigate(`/dashboard?username=${username}`);
        }
      }
    );
  }

  let message;

  !valid && ready
    ? (message = <p className="text-red-500 mt-4">Username Invalid</p>)
    : null;

  return (
    <section className="container flex flex-col justify-center text-center mt-20 mx-auto">
      <h1 className="text-2xl font-bold text-white">
        Enter your Chess.com Username
      </h1>
      <div className="mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            placeholder="Chess.com Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            className="py-2 px-4 bg-slate-800 border-blue-600 border-[3px] rounded-md mr-2 outline-none text-white"
          />
          <button
            className="bg-blue-600 py-2 px-4 rounded-md text-slate-900 transition-all duration-500 hover:bg-blue-500"
            onClick={() => {
              checkUsername(username);
            }}
            onKeyPress={(e) => {
              e.keyCode === 13 ? checkUsername(username) : null;
            }}
            type="submit"
          >
            Submit
          </button>
          {message}
        </form>
      </div>
    </section>
  );
}
