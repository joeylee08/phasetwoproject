import SideBar from "./SideBar"
import Stats from "./Stats";
import GameBoard from "./GameBoard";

const YourPuzzles = ({ currentPuzzle }) => {
    return (
        <>
            <h1>Your Puzzles</h1>
            <SideBar currentPuzzle={currentPuzzle} />
            <Stats currentPuzzle={currentPuzzle} />
            <GameBoard currentPuzzle={currentPuzzle} />
        </>
    )
}

export default YourPuzzles