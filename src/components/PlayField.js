
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

import {useState} from 'react'

const PlayField = () => {
  const [inputValue, setInputValue] = useState()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // console.log(currentUser.activePuzzle.answers)
  // console.log(currentUser.activePuzzle.puzzle.start)

  let updated = [...currentUser.activePuzzle.answers]

  const numReg = /[0-9]/;

  const handleSetInputValue = (value) => {
    setInputValue(value)
  }

  const handleInput = (e) => {
    
    if (!e.target.value.match(numReg)) {
      setInputValue("")
      return
    }
    if (+e.target.value > 9) {
      setInputValue(+e.target.value.slice(0, 1))
      return
    }

    updated = updated.map((item, idx) => {
    if (+e.target.parentElement.id === idx) return +e.target.value;
    else return item;
    })
    
    const updatedUser = {
      ...currentUser
    }
    
    updatedUser.activePuzzle.answers = updated

    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    console.log(updated)
  }
  
  return (
    <div id="playfield">
      <SideBar />
      <Stats  />
      <GameBoard  handleInput={handleInput} answers={updated} handleSetInputValue={handleSetInputValue} inputValue={inputValue}/>
    </div>
  )
}

export default PlayField