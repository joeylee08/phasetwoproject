import { Routes, Route } from "react-router-dom";

import About from "./About";
import Instructions from "./Instructions";
import LeaderBoard from "./LeaderBoard";
import SudokuStore from "./SudokuStore";
import YourPuzzles from "./YourPuzzles";
import MainBody from "./MainBody";
import LoginModal from "./LoginModal";
import Error from "./Error";

/* Look into Navigate component for alternate to null in conditional rendering - https://learning.flatironschool.com/courses/6844/pages/programmatic-navigation?module_item_id=607232 */

function Router({ showApp, currentUser, setCurrentUser, onContinueAsGuest, onLoginSuccess, updateUser }) {
    const routes =  ( 
        <>
            <Route path="/about" element={<About />} />,
            <Route path="/leader-board" element={<LeaderBoard />} />,
            <Route path="/instructions" element={<Instructions />} />,
            <Route path="/your-puzzles" element={<YourPuzzles currentUser={currentUser} />} />,
            <Route path="/sudoku-store" element={<SudokuStore />} />
        </>
    )
  return (
    <>
      <Routes>
        <Route path="/" element={showApp ? <MainBody currentUser={currentUser} setCurrentUser={setCurrentUser} /> : < LoginModal onLoginSuccess={onLoginSuccess} onContinueAsGuest={onContinueAsGuest} />} />
        {showApp ? routes : null}
        {/* Default route to catch any routes that I have not declared */}
        <Route path="/:error" element={<Error />} />
      </Routes>
    </>
  );
}

export default Router;
