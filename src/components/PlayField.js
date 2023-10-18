
import SideBar from "./SideBar"
import Stats from "./Stats"
import GameBoard from "./GameBoard"

const PlayField = ({ currentUser, setCurrentUser, postCurrentUser}) => {
  const answers = currentUser.activePuzzle.answers;

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
    if (+e.target.parentElement.id === idx) return +e.target.value;
    else return item;
    })
    
    const updatedUser = {
      ...currentUser
    }

    updatedUser.activePuzzle.answers = updated

    // setCurrentUser({...updatedUser})
    console.log(updatedUser)
  }
  
  return (
    <div id="playfield">
      <SideBar />
      <Stats currentUser={currentUser} answers={answers} postCurrentUser={postCurrentUser}/>
      <GameBoard answers={answers} handleInput={handleInput} />
    </div>
  )
}

export default PlayField