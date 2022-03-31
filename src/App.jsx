import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";

export default function App() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </main>
  );
}
