import { useEffect, useState } from "react";
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const URL = "http://localhost:3001/puzzles/";

const PlayField = ({ currentUser }) => {
  const [currentPuzzle, setCurrentPuzzle] = useState({});
  const [currentAnswers, setCurrentAnswers] = useState([])

  const urlId = (currentUser && currentUser.puzzles.saved[0]) || Math.floor(Math.random() * 250) + 1
  
  const displayPuzzle = (puzzle, answers) => {
    const tdArray = Array.from(document.querySelectorAll("td"));

    setCurrentPuzzle(puzzle)
    setCurrentAnswers(answers)

    console.log("puzzle: ", puzzle)
    console.log("answers: ", answers)

    tdArray.forEach((item, idx) => {
      if (answers[idx]) {
        item.textContent = answers[idx]
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
      displayPuzzle(data, data.newboard.grids[0].value.flat())
    })
    .catch(err => alert(err));
  }, [])

  
  return (
    <div id="playfield">
      <SideBar currentPuzzle={currentPuzzle} />
      <Stats currentPuzzle={currentPuzzle} />
      <GameBoard currentPuzzle={currentPuzzle} />
    </div>
  )
}

export default PlayField