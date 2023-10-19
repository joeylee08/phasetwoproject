import GameInput from "./GameInput";

const GameCell = ({ answers, cellId }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const initial = currentUser && currentUser.activePuzzle && currentUser.activePuzzle.puzzle && currentUser.activePuzzle.puzzle.start ? currentUser.activePuzzle.puzzle.start : {};

  console.log(cellId)
  return (
    <td id={cellId}>{initial[cellId] ? initial[cellId] : <GameInput cellId={cellId} answers={answers}/>}</td>
  )
}

export default GameCell;