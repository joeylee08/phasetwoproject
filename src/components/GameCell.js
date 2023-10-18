import GameInput from "./GameInput";

const GameCell = ({ cellData, handleInput, idCount }) => {
    return (
        <td id={idCount}>{cellData ? cellData : <GameInput handleInput={handleInput} /> }</td>
    )
}

export default GameCell;