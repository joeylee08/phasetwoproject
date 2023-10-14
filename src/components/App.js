import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import '../index.css';

import About from "./About";
import Instructions from "./Instructions";
import LeaderBoard from "./LeaderBoard";
import SudokuStore from "./SudokuStore";
import YourPuzzles from "./YourPuzzles";
import MainBody from "./MainBody";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";

function App() {
  const [showApp, setShowApp] = useState(false)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={showApp ? <MainBody /> : <LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/yourpuzzles" element={<YourPuzzles />} />
        <Route path="/sudokustore" element={<SudokuStore />} />
      </Routes>
    </>
  );
}

export default App;
