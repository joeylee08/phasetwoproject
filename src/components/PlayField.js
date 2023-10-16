import { useEffect, useState } from "react";
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"
const URL = "http://localhost:3001/puzzles/";

const PlayField = ({ currentUser }) => {
  const [puzzle, setPuzzle] = useState({});
  const urlId = (currentUser && currentUser.puzzles.saved[0]) || Math.floor(Math.random() * 250) + 1
  
  const displayPuzzle = (puzzleObj) => {
    const tdArray = Array.from(document.querySelectorAll("td"));
    const newObj = {
      id: puzzleObj.id,
      puzzle: puzzleObj.newboard.grids[0].value.flat(),
      solution: puzzleObj.newboard.grids[0].solution.flat(),
      difficulty: puzzleObj.newboard.grids[0].difficulty
    }
    setPuzzle(newObj);
    tdArray.forEach((item, idx) => {
      if (newObj.puzzle[idx]) {
        item.textContent = newObj.puzzle[idx]
      } else {
        const input = document.createElement("input")
        input.value = "";
        input.classList.add("sudoku-input")
        item.textContent = "";
        item.append(input)
      }
    })
  }

  useEffect(() => {
    fetch(`${URL}${urlId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      displayPuzzle(data)
    })
    .catch(err => alert(err));
  }, [])

  
  return (
    <div id="playfield">
      <SideBar currentPuzzle={puzzle} />
      <Stats currentPuzzle={puzzle} />
      <GameBoard currentPuzzle={puzzle} />
    </div>
  )
}

export default PlayField