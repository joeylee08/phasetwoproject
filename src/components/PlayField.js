import { useEffect, useState } from "react";
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const PlayField = ({ currentUser }) => {
  console.log(currentUser)
  const answers = currentUser.activePuzzle.answers.flat();
  const solution = currentUser.activePuzzle.solution.flat();
  
  const displayPuzzle = (answers) => {
    const tdArray = Array.from(document.querySelectorAll("td"));

    tdArray.forEach((item, idx) => {
      if (answers[idx]) {
        item.textContent = answers[idx]
      } else {
        const input = document.createElement("input");
        input.id = idx
        input.value = "";
        input.classList.add("sudoku-input");
        // input.addEventListener('input', updateAnswers)
        item.textContent = "";
        item.append(input)
      }
    })
  }

  useEffect(() => {
    displayPuzzle(answers)
  }, [])
  
  return (
    <div id="playfield">
      <SideBar />
      <Stats />
      <GameBoard />
    </div>
  )
}

export default PlayField