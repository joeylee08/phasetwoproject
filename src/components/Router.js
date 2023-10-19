import { Routes, Route } from "react-router-dom";
import About from "./About";
import Instructions from "./Instructions";
import LeaderBoard from "./LeaderBoard";
import SudokuStore from "./SudokuStore";
import YourPuzzles from "./YourPuzzles";
import MainBody from "./MainBody";
import LoginModal from "./LoginModal";
import Loading from "./Loading";
import Error from "./Error";

function Router({ showApp, onContinueAsGuest, onLoginSuccess, handleSetCurrentUser}) {
    const routes =  ( 
        <>
            <Route path="/about" element={<About />} />,
            <Route path="/leader-board" element={<LeaderBoard />} />,
            <Route path="/instructions" element={<Instructions />} />,
            <Route path="/your-puzzles" element={<YourPuzzles />} />,
            <Route path="/sudoku-store" element={<SudokuStore />} />
            <Route path="/loading" element={<Loading/>} />
            <Route path="/loading/:param" element={<Loading/>} />
        </>
    )
  return (
    <>
      <Routes>
        <Route path="/" element={showApp ? <MainBody handleSetCurrentUser={handleSetCurrentUser}/> : < LoginModal onLoginSuccess={onLoginSuccess} onContinueAsGuest={onContinueAsGuest} />} />
        {showApp ? routes : null}
        <Route path="/:error" element={<Error />} />
      </Routes>
    </>
  );
}

export default Router;
