import SideBar from "./SideBar"
import Stats from "./Stats";
import GameBoard from "./GameBoard";

const YourPuzzles = ({ currentUser }) => {
    // console.log("current", currentUser.saved[0].newboard.grids[0].value)
    // const puzzleToBeDisplayed = currentUser
    return (
        <>
            <h1>Your Puzzles</h1>
            {/* <SideBar currentPuzzle={puzzleToBeDisplayed} />
            <Stats currentPuzzle={puzzleToBeDisplayed} />
            <GameBoard currentPuzzle={puzzleToBeDisplayed} /> */}
        </>
    )
}

export default YourPuzzles