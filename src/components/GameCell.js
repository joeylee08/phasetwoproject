import GameInput from "./GameInput";

const GameCell = ({ answers, id }) => {
    return (
        <td>{answers[id] ? answers[id] : <GameInput/>}</td>
    )
}

export default GameCell;