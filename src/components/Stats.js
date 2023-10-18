const Stats = ({currentUser, postCurrentUser}) => {
  const userURL = "http://localhost:3001/users"

  const handleSaveGame = () => {

    //check if currentUser already has this puzzle saved
    if (currentUser.saved.find((puzzle) => puzzle.id === currentUser.activePuzzle.puzzle.id)) {
      currentUser.saved = currentUser.saved.filter(puzzle => puzzle.id !== currentUser.activePuzzle.puzzle.id)
    }

    //push current puzzle to "saved"
    currentUser.saved.unshift(currentUser.activePuzzle.puzzle)
    
    //update with postCurrentUser
    postCurrentUser(currentUser)

    //patch DB with currentUser
    fetch(`${userURL}/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const checkSolution = () => {
    console.log(String(currentUser.activePuzzle.answers) === String(currentUser.activePuzzle.solution))
  }
  
  return (
    <div id="stats" className='playfield-elements'>
      <button id="checkSolution" onClick={checkSolution}>Submit</button>
      <button id="saveGame" onClick={handleSaveGame}>Save Game</button>
    </div>
  )
}

export default Stats