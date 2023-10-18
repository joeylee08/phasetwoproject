const Stats = ({currentUser, answers}) => {
  const handleSaveGame = () => {
    console.log("currentUser: ", currentUser)
    console.log("answers: ", answers)

    //update localStorage > currentUser > 

    //update localStorage currentUser[key] with currentUser[state]

    //patch DB with currentUser id, to include updated answers
  }

  const checkSolution = () => {
    console.log(String(currentUser.activePuzzle.answers) === String(currentUser.activePuzzle.solution))
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Check Solution</button>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats