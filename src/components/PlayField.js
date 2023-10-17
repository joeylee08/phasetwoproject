import { useEffect, useState } from "react";
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const PlayField = ({ currentUser, setCurrentUser}) => {
  const answers = currentUser.activePuzzle.answers;
  const solution = currentUser.activePuzzle.solution;

  const handleInput = (e) => {
    const updated = answers.map((item, idx) => {
      if (e.target.id === idx) return e.target.value;
      else return item;
    })
    setCurrentUser({
      ...currentUser,
      activePuzzle: {

      }
    })
    console.log(answers)
  }
  
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
        input.addEventListener('input', handleInput)
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
      <Stats currentUser={currentUser} answers={answers}/>
      <GameBoard />
    </div>
  )
}

export default PlayField