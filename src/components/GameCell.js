import GameInput from "./GameInput";

const GameCell = ({ cellData, handleInput, idCount, idx, inputValue, handleSetInputValue }) => {
    const start = JSON.parse(localStorage.getItem('currentUser')).activePuzzle.puzzle.start;

    return (
        <td id={idCount}>{start[idCount] !== 0 ? cellData : <GameInput idCount={idCount} handleSetInputValue={handleSetInputValue} inputValue={inputValue} handleInput={handleInput} /> }</td>
    )
}

export default GameCell;