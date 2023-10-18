import { useEffect, useState } from "react";
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const PlayField = ({ currentUser, setCurrentUser, postCurrentUser}) => {
  const answers = currentUser.activePuzzle.answers;
  const solution = currentUser.activePuzzle.solution;

  let updated = [...answers]

  const numReg = /[0-9]/;

  const handleInput = (e) => {
    if (!e.target.value.match(numReg)) {
      e.target.value = ""
      return
    }
    if (+e.target.value > 9) {
      e.target.value = e.target.value.slice(0, 1)
    }

    updated = updated.map((item, idx) => {
    if (+e.target.id === idx) return +e.target.value;
    else return item;
    })
    
    const updatedUser = {
      ...currentUser
    }

    updatedUser.activePuzzle.answers = updated

    setCurrentUser({...updatedUser})
    console.log(updatedUser)
  }
  
  const displayPuzzle = (answers) => {
    console.log(currentUser)
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
  }, [currentUser.saved])
  
  return (
    <div id="playfield">
      <SideBar />
      <Stats currentUser={currentUser} answers={answers} postCurrentUser={postCurrentUser}/>
      <GameBoard />
    </div>
  )
}

export default PlayField