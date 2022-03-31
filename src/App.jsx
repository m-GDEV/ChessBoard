import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}
