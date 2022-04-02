import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between mx-auto sm:container px-4 sm:px-0 pt-5 text-xl">
      <div>
        <Link to="/" className="text-red-500">
          ChessBoard
        </Link>
      </div>
      <div>
        <Link to="/about" className="text-white">
          About
        </Link>
      </div>
    </header>
  );
}
