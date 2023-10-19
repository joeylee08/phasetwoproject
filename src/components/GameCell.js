import GameInput from "./GameInput";

const GameCell = ({ answers, cellId }) => {
  const initial = JSON.parse(localStorage.getItem("currentUser")).activePuzzle.puzzle.start;
  return (
    <td id={cellId}>{initial[cellId] ? initial[cellId] : <GameInput cellId={cellId} answers={answers}/>}</td>
  )
}

export default GameCell;